import { useState } from 'react';

export const defaultFilters = {
    sustainabilityType: [],
    color: [],
    occasion: [],
    material: [],
}
export function useFilters() {
    const [filters, setFilters] = useState(defaultFilters);
    return { filters, setFilters };
}