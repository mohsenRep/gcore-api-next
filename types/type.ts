export interface ApiKey {
    name: string;
    apiKey: string;
}

export interface ApiKeys extends Array<ApiKey> { }

export interface User {
    id: number;
    deleted: boolean;
    email: string;
    name: string;
    client: number;
    lang: string;
    phone: string | null;
    groups: {
        id: number;
        name: string;
    }[];
    activated: boolean;
    sso_auth: boolean;
    is_active: boolean;
    company: string;
    social_network_auth: boolean;
}

// export Interface for Service Status inside data
export interface ServiceStatus {
    status: string;
    enabled: boolean;
}

// export Interface for Features inside data
export interface Feature {
    feature_id: number;
    service: string;
    name: string;
}

// export Interface for Paid and Free Features inside data
export interface PaidFeatures {
    [key: string]: Feature[];
}

export interface FreeFeature extends Feature {
    free_feature_id?: number;
    create_date?: string;
}

export interface FreeFeatures {
    [key: string]: FreeFeature[];
}

// export Interface for Data1
export interface Data1 {
    id: number;
    country_code: string;
    email: string;
    users: User[];
    currentUser: number;
    capabilities: string[];
    status: string;
    serviceStatuses: {
        [key: string]: ServiceStatus;
    };
    paidFeatures: PaidFeatures;
    freeFeatures: FreeFeatures;
    entryBaseDomain: string;
    signup_process: string;
    has_active_admin: boolean;
    delete_request: string | null;
    name: string;
    phone: string | null;
    hs_synced_at: string;
    hubspot_id: number;
    deleted: boolean;
    version: number;
    companyName: string;
    website: string;
    promo_code: string | null;
    bill_type: string;
    custom_id: string | null;
    is_test: boolean;
}

// export Interface for Data2 (Addendums)
export interface Data2 {
    contract_id: number | null;
    id: number;
    client_id: number;
    plan_id: number;
    plan_currency_char_code: string;
    plan_currency_id: number;
    status: string;
    active_from: string;
    active_to: string | null;
    previous_id: number | null;
    plan_name_en: string;
    product_id: number;
    product_internal_name: string;
    last_process: string;
}

// export Interface for Price Data inside Data3
export interface PriceData {
    id: number;
    currency_id: number;
    currency_code: string;
    money_value: string;
    price_stages: any[]; // Adjust type if price_stages has a known structure
}

// export Interface for Threshold inside Data3
export interface Threshold {
    default_value: string;
    current_value: string;
    remainder: string;
    consumption: string;
    unit_name_en: string;
}

// export Interface for Data3 (CDN Subscription)
export interface Data3 {
    id: number;
    addendum_id: number;
    plan_item_id: number;
    feature_id: number;
    active_from: string;
    active_to: string | null;
    count: number;
    current_count: number;
    last_process_id: string | null;
    process_status: string | null;
    feature_name_en: string;
    price_data: PriceData;
    description: string | null;
    plan_item_description: string | null;
    threshold: Threshold;
}

// Full Response export Interface
export interface ApiResponse {
    name: string;
    data: Data1;
    data2: Data2[];
    data3: Data3[];
    cdnDetailsData: PaginatedResponse
    originGroupData: Origin
}
// Interface for individual result object
export interface Result {
    id: number;
    deleted: boolean;
    secondaryHostnames: string[];
    status: string;
    active: boolean;
    preset_applied: boolean;
    vp_enabled: boolean;
    originGroup_name: string;
    full_custom_enabled: boolean;
    waap_enabled: boolean;
    created: string;
    cname: string;
    sslEnabled: boolean;
    suspend_date: string | null;
    is_primary: boolean | null;
    description: string;
    originGroup: number;
    sslData: any | null; // Adjust type if sslData has a known structure
    primary_resource: any | null; // Adjust type if primary_resource has a known structure
}

// Interface for the full response
export interface PaginatedResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Result[];
}
type Source = {
    source: string;
    backup: boolean;
    enabled: boolean;
    tag: string;
};

export type Origin = {
    id: number;
    name: string;
    sources: Source[];
    has_related_resources: boolean;
    use_next: boolean;
    proxy_next_upstream: string | null;
    auth_type: string;
    path: string;
};