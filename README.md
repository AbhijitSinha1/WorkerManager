# WorkerManager

## Introduction

This is a script to manage multiple subprocesses. Say a task needs to be done in parallel, but you want to control the number of parallel workers to initiate, you could use `WorkerManager`.

## Installation

```shell
git clone https://github.com/AbhijitSinha1/WorkerManager.git
cd WorkerManager
npm install
```

## Example

```shell
node workerManager.js timer.js 10
```

This command will start 10 sub processes each running the `timer.js`. Once the task within the file is done, the `workerManager` exits. In case of long running tasks, if you quit the `workerManager`, its sub processes also terminated.
## Improvements

### Multi code
Right now it can only run a single javascript code in multiple subprocesses, it should be able to run different javascript code, something like:

```shell
node workerManager.js worker1.js 10 worker2.js 5 worker3.js 15
```

This should spawn 30 sub processes where 10 are dedicated for `worker1.js` 5 for `worker2.js` and 15 for `worker3.js`

### Dynamic worker count update

We should be able to inrease the number of subprocesses the manager handles by spawning more processes or killing child processes as per requirement

### Execute non javascript code

The manager should be able to handle any kind of code, not necessarily javascript code.
