import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const store=await readFile(new URL('../src/pgstore.js',import.meta.url),'utf8');
const server=await readFile(new URL('../src/server.js',import.meta.url),'utf8');
const main=await readFile(new URL('../../src/main.jsx',import.meta.url),'utf8');

test('redeemed access and active sessions are not bound to a fixed IP address',()=>{
 assert.doesNotMatch(store,/access_ip_hash=COALESCE\(access_ip_hash,\$2\)/);
 assert.doesNotMatch(store,/access_ip_hash IS NULL OR access_ip_hash=\$2/);
 assert.doesNotMatch(store,/s\.ip_hash=\$2/);
});

test('English, Czech and German access copy describes portable secure sessions',()=>{
 assert.match(main,/same secure browser session can continue even if the network address changes/i);
 assert.match(main,/Stejná zabezpečená relace prohlížeče může pokračovat i při změně síťové adresy/);
 assert.match(main,/Dieselbe sichere Browsersitzung kann auch bei einer Änderung der Netzwerkadresse fortgesetzt werden/);
 assert.match(server,/not bound to a fixed IP address/);
 assert.match(server,/není vázán na pevnou IP adresu/);
 assert.match(server,/nicht an eine feste IP-Adresse gebunden/);
});
