import { test as business } from "./business.fixture";
import { test as api } from "./api.fixture";
import { test as mock } from "./mock.fixture";
import { mergeTests, expect } from "@playwright/test";

const test = mergeTests(business, api, mock);

export { test, expect };
