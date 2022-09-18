export class GetPlayersScoreFirebaseRepository {
   /**
     * @type {import('firebase/compat/index').default.database.Database}
     */
  #firebaseDatabase

  constructor({ firebaseDatabase }) { 
    this.#firebaseDatabase = firebaseDatabase
  }

   onPlayerScoreValue(context = {}) {
    const { player, playerName} = context
    const playerData = player.val()

    if (!playerData) {
      return []
    }

    if (playerName) {
      return [
        {
          playerName,
          score: playerData,
        },
      ]
    }
    const parsedPlayerData = Object.entries(playerData).map(
      ([key, value]) => ({
        playerName: key,
        score: value,
      })
    )

    return parsedPlayerData
  }


  async getPlayersScore({ playerName = '' } = {}) {
    return new Promise((resolve, reject) => {
      try {
        const playersRef = this.#firebaseDatabase.ref(`ranking/${playerName}`)
        playersRef.on('value', player => {
          const parsedPlayerData = this.onPlayerScoreValue({
            player,
            playerName,
          })

          resolve(parsedPlayerData)
        })
      } catch (error) {
        reject(error)
      }
    })
  }
}
