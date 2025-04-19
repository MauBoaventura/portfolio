type Repository = {
  id: number;
  name: string;
  description?: string;
  stargazers_count: number;
  language: string;
  license?: {
    key: string;
    name: string;
    spdx_id: string;
  };
  homepage?: string;
  html_url: string;
};

type Job = {
  key: string;
  name: string;
  logo_dark: string;
  logo_light: string;
  date_start: string;
  date_end: string;
  tags: string[];
};

type Results = {
  key: string;
  name: string;
  logo: string;
  logo_dark?: string;
  logo_light?: string;
  url: string;
  tags: string[];
};
