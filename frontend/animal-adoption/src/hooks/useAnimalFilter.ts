import { useState } from "react"

import { FilterValues } from "../models/FilterSchema"

export const useAnimalFilter = (): {
    filters: FilterValues;
    setFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
    buildQueryString: () => string;
} => {
    const [filters, setFilters] = useState<FilterValues>({
        species: '',
        status: 'Valabil',
        sex: '',
        city: '',
        country: ''
    })

    const buildQueryString = (): string => {
        const query = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) query.append(key, value);
        });
        return query.toString();
    };

    return {
        filters,
        setFilters,
        buildQueryString
    };
}
