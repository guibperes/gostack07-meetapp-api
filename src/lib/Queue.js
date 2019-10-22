import Bee from 'bee-queue'

import { RedisConfig } from '../config/redis'
import SubscriptionMail from '../app/jobs/SubscriptionMail'

class Queue {
  constructor () {
    this.queues = {}

    this.jobs = [
      SubscriptionMail
    ]

    this.init()
  }

  init () {
    this.jobs.map(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, { redis: RedisConfig }),
        handle
      }
    })
  }

  add (queue, job) {
    return this.queues[queue].bee
      .createJob(job)
      .save()
  }

  processQueue () {
    this.jobs.map(job => {
      const { bee, handle } = this.queues[job.key]

      bee
        .on('succeeded', this.handleSucceeded)
        .on('failed', this.handleFailure)
        .process(handle)
    })
  }

  handleSucceeded (job) {
    console.log(`[SUCCESS] Job process ${job.queue.name} has succeeded`)
  }

  handleFailure (job, err) {
    console.log(`[FAILED] Job process ${job.queue.name} has failed`, err)
  }
}

export default new Queue()
