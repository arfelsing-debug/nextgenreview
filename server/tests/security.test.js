import test from "node:test";import assert from "node:assert/strict";import{sha256,randomToken,safeEqualHex}from"../src/security.js";import{issueCsrf,verifyCsrf}from"../src/csrf.js";
test("tokens are opaque and random",()=>{const a=randomToken(),b=randomToken();assert.notEqual(a,b);assert.ok(a.length>=40)});
test("hash comparison validates exact token",()=>{const h=sha256("alpha");assert.equal(safeEqualHex(h,sha256("alpha")),true);assert.equal(safeEqualHex(h,sha256("beta")),false)});
test("csrf token verifies only against its session hash",()=>{const c=issueCsrf();assert.equal(verifyCsrf({csrfHash:c.hash},c.token),true);assert.equal(verifyCsrf({csrfHash:c.hash},"wrong"),false)});
