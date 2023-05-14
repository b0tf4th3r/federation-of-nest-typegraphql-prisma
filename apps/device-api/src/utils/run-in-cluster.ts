import cluster from 'cluster'
import * as os from 'os'

export function runInCluster(bootstrap: () => Promise<void>) {
  if (os.platform() === 'win32' || process.env.CLUSTERS_ENABLED !== 'true') {
    return bootstrap()
  }

  const numberOfCores = os.cpus().length

  if (cluster.isMaster) {
    for (let i = 0; i < numberOfCores; ++i) {
      cluster.fork()
    }

    cluster.on('exit', function (worker, code, signal) {
      console.log(`worker ${worker.process.pid} died`)
      cluster.fork()
    })
  } else {
    bootstrap()
  }
}
