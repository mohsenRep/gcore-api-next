import { useState, useEffect } from "react";
import { ApiKeys, ApiResponse } from '@/types/type';


const MAX_RETRIES = 3;
const TIMEOUT_MS = 10000;

async function fetchWithTimeout(resource: string, options: RequestInit) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
        const response = await fetch(resource, {
            ...options,
            signal: controller.signal,
        });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
}

const fetchSingleKey = async ({
  name,
  apiKey,
}: ApiKeys[0]): Promise<ApiResponse> => {
  // اینجا تقریباً همان کد makeRequest قبلی است، اما فقط برای یک کلید
  const headers = new Headers({
    Authorization: `APIKey ${apiKey}`,
    "Content-Type": "application/x-www-form-urlencoded",
  });
  let retries = 0;
  const makeRequest = async (): Promise<ApiResponse> => {
    try {
      const [accountResponse, addendumResponse] = await Promise.all([
        fetchWithTimeout("https://api.gcore.com/iam/clients/me", {
          method: "GET",
          headers,
        }),
        fetchWithTimeout(
          "https://api.gcore.com/billing/v3/addendums?ordering=active_from",
          {
            method: "GET",
            headers,
          }
        ),
      ]);

      if (accountResponse.status === 429 || addendumResponse.status === 429) {
        const retryAfter = Math.max(
          parseInt(accountResponse.headers.get("Retry-After") || "5", 10),
          parseInt(addendumResponse.headers.get("Retry-After") || "5", 10)
        );
        await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
        throw new Error("Rate limited");
      }

      if (!accountResponse.ok || !addendumResponse.ok) {
        throw new Error(
          `HTTP Error: ${accountResponse.status} ${addendumResponse.status}`
        );
      }

      const data = await accountResponse.json();
      const data2 = await addendumResponse.json();

      if (!Array.isArray(data2)) {
        throw new Error("Invalid addendum response format");
      }

      const cdnAddendum = data2.find(
        (item) => item.product_internal_name === "CDN"
      );

      const cdnResponse = await fetchWithTimeout(
        `https://api.gcore.com/billing/v3/addendums/${cdnAddendum.id}/subscriptions?check_threshold=true`,
        {
          method: "GET",
          headers,
        }
      );

      if (!cdnResponse.ok) {
        throw new Error(`CDN HTTP Error: ${cdnResponse.status}`);
      }

      const data3 = await cdnResponse.json();

      const cdnDetails = await fetchWithTimeout(
        `https://api.gcore.com/cdn/resources?offset=0&limit=10&search=&ordering=-id&status=active,processed&exclude=&fields=id,active,cname,originGroup,originGroup_name,secondaryHostnames,preset_applied,status,created,deleted,description,sslEnabled,sslData,primary_resource,full_custom_enabled,is_primary,vp_enabled,suspend_date,waap_enabled`,
        {
          method: "GET",
          headers,
        }
      );

      if (!cdnDetails.ok) {
        throw new Error(`CDN HTTP Error: ${cdnResponse.status}`);
      }

      const cdnDetailsData = await cdnDetails.json();

      return { name, data, data2, data3, cdnDetailsData };
    } catch (error) {
      if (retries < MAX_RETRIES) {
        retries++;
        await new Promise((resolve) => setTimeout(resolve, 2000 * retries));
        return makeRequest();
      }
      throw error;
    }
  };

  return makeRequest();
};

export const useFetchApiDataStreaming = (apiKeys: ApiKeys) => {
  const [dataList, setDataList] = useState<ApiResponse[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;
    const loadAll = async () => {
      setIsLoading(true);
      setDataList([]);
      setError(null);

      for (const key of apiKeys) {
        try {
          const result = await fetchSingleKey(key);
          if (cancelled) break;
          setDataList((prev) => [...prev, result]);
        } catch (err: any) {
          console.error(`Error for key ${key.name}:`, err);
          // می‌تونید اینجا خطاها رو هم در state نگه دارید
          // یا نادیده بگیرید و ادامه بدید:
          if (!cancelled) {
            // setError(err);
            // break; // یا اگه بخواید کل جریان قطع بشه
          }
        }
      }

      if (!cancelled) setIsLoading(false);
    };

    loadAll();
    return () => {
      cancelled = true;
    };
  }, [apiKeys]);

  return { data: dataList, isLoading, error };
};
