import { initializeTestEnvironment } from '@firebase/rules-unit-testing'

const userAuth = {
  uid: 'user1',
  email: 'some_name@some_domain.com',
}

class FirebaseTestHelpers {
  async connect({ projectId = 'test-project' } = {}) {
    this.projectId = projectId
    this.testEnvironment = await initializeTestEnvironment({
      projectId,
      database: {
        host: 'localhost',
        port: 9000,
      },
      auth: userAuth,
    })
    this.database = this.testEnvironment
      .authenticatedContext('some_user')
      .database()
    return this.testEnvironment
  }

  async reset() {
    await this.testEnvironment.clearDatabase({ projectId: this.projectId })
    await this.testEnvironment.cleanup()
    this.database = null
  }

  async insertDataWithRef(refString, data) {
    if (!this.database) {
      await this.connect()
    }

    const ref = this.database.ref(refString)
    return new Promise((resolve, reject) => {
      ref.set(data, error => {
        if (!error) {
          ref.on('value', data => {
            resolve(data.val())
          })
        } else {
          reject(error)
        }
      })
    })
  }
}
export default new FirebaseTestHelpers()
