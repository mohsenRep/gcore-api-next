import { useQuery } from '@tanstack/react-query';
interface ApiKey {
    name: string;
    apiKey: string;
}
interface ApiKeys extends Array<ApiKey> { }
const useFetchApiData = (apiKeys: ApiKeys) => {
    const fetchApiData = async () => {
        if (apiKeys.length > 0) {
            try {
                const allData = await Promise.all(
                    apiKeys.map(async ({ name, apiKey }) => {
                        const responseAccount = await fetch(
                            `https://api.gcore.com/iam/clients/me`,
                            {
                                method: 'GET',
                                headers: new Headers({
                                    Authorization: 'APIKey ' + apiKey,
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                }),
                            },
                        );
                        const data = await responseAccount.json();

                        const responseAddendums = await fetch(
                            `https://api.gcore.com/billing/v3/addendums?ordering=active_from`,
                            {
                                method: 'GET',
                                headers: new Headers({
                                    Authorization: 'APIKey ' + apiKey,
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                }),
                            },
                        );
                        //   https://api.gcore.com/cdn/statistics/series?service=CDN&flat=true&from=2024-06-18T12:19:44.297Z&to=2024-07-18T12:19:44.297Z&metrics=sent_bytes&metrics=shield_bytes&metrics=upstream_bytes&metrics=total_bytes&metrics=cdn_bytes&group_by=resource&granularity=1d&resource=695503
                        const data2 = await responseAddendums.json();

                        const cdnId = data2.filter((data: any) => {
                            return data.product_internal_name === 'CDN';
                        });

                        const responseCdn = await fetch(
                            `https://api.gcore.com/billing/v3/addendums/${cdnId[0].id}/subscriptions?check_threshold=true`,
                            {
                                method: 'GET',
                                headers: new Headers({
                                    Authorization: 'APIKey ' + apiKey,
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                }),
                            },
                        );

                        const data3 = await responseCdn.json();
                        return { name, data, data2, data3 };
                    }),
                );
                return allData;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ['apiData'],
        queryFn: fetchApiData,
    });

    return { data, isLoading, error };
};

export default useFetchApiData;