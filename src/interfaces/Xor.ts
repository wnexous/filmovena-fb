export type XOR<T> = {
    [K in keyof T]: { [P in K]: T[K] } & Partial<Record<Exclude<keyof T, K>, never>>;
}[keyof T];


