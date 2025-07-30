import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCountries = createAsyncThunk(
  'country/getCountries',
  async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all?fields=name,idd");

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to fetch countries');
      }

      const data = await res.json();

      const countries = data
        .map((country) => {
          const name = country.name?.common;
          const root = country.idd?.root;
          const suffix = country.idd?.suffixes?.[0];

          if (!name || !root || !suffix) return null;

          return {
            name,
            dialCode: root + suffix,
          };
        })
        .filter(Boolean)
        .sort((a, b) => a.name.localeCompare(b.name));

      return countries;
    } catch (err) {
      return err.message;
    }
  }
);
