---
title: "d-lmdb is now available as a Docker image: a 3-node cluster and failover demo"
date: 2026-07-29
excerpt: >
  d-lmdb-server is now available as a Docker image — spin up a 3-node HA cluster and see leader failover in action in about 5 minutes.
authors:
  - joshua
tags:
  - d-engine
  - lmdb
  - distributed-systems
  - raft
  - rust
  - embedded
  - docker
---

I’m happy to share `d-lmdb-server` and the corresponding Docker image: [deventlab/d-lmdb](https://hub.docker.com/r/deventlab/d-lmdb).  
The code is here: [github.com/deventlab/d-lmdb](https://github.com/deventlab/d-lmdb).

If you want to try it without reading the code first, you can now test it directly with Docker. It should take about 5 minutes to get started.

What I wanted to do here is simple: turn an experimental distributed LMDB setup into something easier to try, so people can validate it quickly and give feedback more easily.

If you try it and find problems, or think the docs, API, or UX can be improved, PRs and issues are very welcome.

---

## 1. You can now run d-lmdb-server directly with Docker

`d-lmdb-server` can now run as a standalone HTTP service.

It supports:

- quick single-node startup
- a 3-node HA cluster demo
- continued reads and writes after leader failover

For me, the main point of this step is to let developers try it with the lowest possible cost, without embedding Rust code into their own applications.

---

## 2. Why build a Docker version

When I look at infrastructure projects, I usually ask one very practical question:

> Can I run it in 5 minutes and see if it is a good fit for me?

The Docker version is built for this use case.

It is not meant to replace the library version, and it is not meant to add an unnecessary extra layer.  
It is just a way to help people try it faster and start validating it sooner.

If you are:

- not sure yet whether you want to embed the library
- interested in a standalone service
- trying to test multi-node behavior and failover

then the Docker version may be easier to start with.

---

## 3. One-sentence description

`d-lmdb-server` is a standalone HTTP service for distributed, LMDB-backed key-value storage.

It is not trying to replace LMDB itself.  
It is more like a demo of how to add a replicated write path to an existing embedded storage engine.

If you prefer a shorter version:

> **Reads stay local. Writes go through Raft. Each node still stores the full dataset.**

That means:

- reads still use the local node by default
- writes go through Raft consensus
- every node keeps the full dataset, so there is no sharding

---

## 4. How to try it

### Single node

If you just want to see whether the service starts correctly, you can try the single-node setup first:

```bash
docker rm -f dlmdb 2>/dev/null   # clean up from a previous run
docker run -d --name dlmdb -p 8080:8080 -v dlmdb-data:/data deventlab/d-lmdb
sleep 3                            # wait for startup
curl -s -o /dev/null -w 'PUT: %{http_code}\n' -X PUT localhost:8080/kv/hello -d world
curl localhost:8080/kv/hello
```

If everything works, you should see:

- `PUT` returns `204`
- `GET` returns `world`

There is no extra config needed for the first start.  
A single-node TOML file will be generated automatically.

If you want to use your own config, you can mount a custom `config.toml`.

---

### 3-node cluster

If you want to see how it behaves in a multi-node setup, you can try the 3-node cluster:

```bash
git clone https://github.com/deventlab/d-lmdb.git && cd d-lmdb
docker pull deventlab/d-lmdb:latest
docker tag deventlab/d-lmdb:latest d-lmdb-server:compose   # compose uses this local tag
docker compose down -v 2>/dev/null
docker compose up -d
sleep 10   # wait for leader election and health checks
```

Then you can check the cluster status:

```bash
docker compose ps
curl -s -o /dev/null -w 'node1: %{http_code}\n' localhost:18081/primary
curl -s -o /dev/null -w 'node2: %{http_code}\n' localhost:18082/primary
curl -s -o /dev/null -w 'node3: %{http_code}\n' localhost:18083/primary
curl -s -o /dev/null -w 'PUT: %{http_code}\n' -X PUT localhost:8080/kv/hello -d world
curl localhost:8080/kv/hello
```

If you want to test failover, you can kill the leader and keep writing:

```bash
docker compose kill -s KILL node1   # replace this with the actual leader node
sleep 5
curl -s -o /dev/null -w 'PUT: %{http_code}\n' -X PUT localhost:8080/kv/post-failover -d alive
curl localhost:8080/kv/post-failover
```

What I like most about this part is not that it looks complete, but that you can directly feel one thing:

**after the leader goes down, the client does not need to know that anything changed internally.**

`compose/smoke-test.sh` contains the full automated walkthrough, including leader crash and recovery checks.

---

## 5. What it roughly does

If I describe the architecture in one sentence:

> **Reads stay local. Writes go through Raft. Each node still stores the full dataset.**

The goal here is not sharding or scaling out.  
It is fault tolerance.

In a way, it turns LMDB, which is a local embedded storage engine, into a system that can tolerate failures across multiple nodes.

---

## 6. This is still 0.1.0, so feedback is very welcome

`d-lmdb-server` is still an early version.

What I hope to learn from real usage is:

- whether the documentation is clear enough
- whether the API feels natural
- whether the failure cases are covered well enough
- whether the read/write semantics are easy to understand

If you try it and find anything that can be improved, please open an issue.  
If you find a bug or a clear way to improve the code or docs, PRs are also very welcome.

---

## 7. Closing

If you want to try it, you can pull the Docker image [deventlab/d-lmdb](https://hub.docker.com/r/deventlab/d-lmdb) and give it a try.

`d-lmdb-server` is still early-stage, and I hope it can be used more in real situations first, then improved based on feedback.

Project page:

- [d-lmdb](https://github.com/deventlab/d-lmdb)

Issues, PRs, and direct feedback are all very welcome.
