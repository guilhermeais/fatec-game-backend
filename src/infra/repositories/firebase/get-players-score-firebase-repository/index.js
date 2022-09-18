export class GetPlayersScoreFirebaseRepository {
  #firebaseDatabase
  constructor({
    firebaseDatabase
  }) {
    /**
     * @type {import('firebase/compat/database/dist/database/index').DatabaseReference}
     */
    this.#firebaseDatabase = firebaseDatabase
  }
  async getPlayersScore({ playerName = '' } = {}) {
    const playersRef = this.#firebaseDatabase.ref(`ranking/${playerName}`)
    return new Promise((resolve, reject) => {
      playersRef.on('value', player => {
        const playerData = player.val()
        const parsedPlayerData = Object.entries(playerData).map(
          ([key, value]) => ({
            playerName: key,
            score: value,
          })
        )

        return resolve(parsedPlayerData)
      })
    })
  }
}
