import { SimilarityScores } from '~/interfaces/SimilarityScores'
import BuefyService from '~/services/buefy-service'
import WebStorageService from '~/services/web-storage-service'

export default class RecommenderSystemService {
  // Predefined User Ratings (Randomly Generated from 0-5)
  private static randomUsersOriginalRatings: any = {
    Alice: [3, 0, 1, 2, 3, 3, 4, 3, 4, 3, 4, 3, 5, 5, 4, 5, 4, 5],
    Ashley: [5, 4, 5, 4, 4, 5, 5, 0, 4, 3, 4, 5, 4, 2, 5, 2, 3, 1],
    Bob: [0, 3, 2, 2, 1, 3, 5, 5, 5, 3, 3, 5, 2, 4, 3, 5, 3, 2],
    Cindy: [3, 2, 2, 3, 3, 0, 4, 3, 5, 4, 3, 4, 2, 5, 4, 3, 4, 5],
    David: [4, 5, 4, 4, 4, 5, 3, 0, 3, 4, 3, 3, 2, 1, 4, 3, 2, 3],
    Dhanayush: [2, 4, 3, 4, 0, 2, 5, 4, 4, 5, 4, 2, 4, 5, 3, 4, 4, 3],
    Hitarth: [4, 5, 4, 5, 4, 5, 0, 2, 3, 3, 4, 3, 4, 5, 3, 4, 4, 2],
    Michael: [5, 4, 5, 5, 5, 5, 5, 0, 4, 5, 2, 4, 2, 5, 4, 5, 4, 5],
    Peter: [5, 4, 0, 4, 3, 4, 3, 4, 2, 3, 4, 4, 0, 5, 4, 1, 4, 5],
    Steve: [5, 4, 5, 4, 4, 5, 0, 3, 2, 2, 4, 3, 2, 4, 3, 0, 3, 4],
  }

  // Mapping of transformed the ratings' data
  // Each predefined user is denoted as a 'random user'
  private static usersRatingsMap: any = {
    Alice: {
      name: 'Alice',
      randomUsersAverage: 0,
      randomUsersRatings: [],
      currentUsersAverage: 0,
      currentUsersRatings: [],
      similarityScore: 0,
    },
    Ashley: {
      name: 'Ashley',
      randomUsersAverage: 0,
      randomUsersRatings: [],
      currentUsersAverage: 0,
      currentUsersRatings: [],
      similarityScore: 0,
    },
    Bob: {
      name: 'Bob',
      randomUsersAverage: 0,
      randomUsersRatings: [],
      currentUsersAverage: 0,
      currentUsersRatings: [],
      similarityScore: 0,
    },
    Cindy: {
      name: 'Cindy',
      randomUsersAverage: 0,
      randomUsersRatings: [],
      currentUsersAverage: 0,
      currentUsersRatings: [],
      similarityScore: 0,
    },
    David: {
      name: 'David',
      randomUsersAverage: 0,
      randomUsersRatings: [],
      currentUsersAverage: 0,
      currentUsersRatings: [],
      similarityScore: 0,
    },
    Dhanayush: {
      name: 'Dhanayush',
      randomUsersAverage: 0,
      randomUsersRatings: [],
      currentUsersAverage: 0,
      currentUsersRatings: [],
      similarityScore: 0,
    },
    Hitarth: {
      name: 'Hitarth',
      randomUsersAverage: 0,
      randomUsersRatings: [],
      currentUsersAverage: 0,
      currentUsersRatings: [],
      similarityScore: 0,
    },
    Michael: {
      name: 'Michael',
      randomUsersAverage: 0,
      randomUsersRatings: [],
      currentUsersAverage: 0,
      currentUsersRatings: [],
      similarityScore: 0,
    },
    Peter: {
      name: 'Peter',
      randomUsersAverage: 0,
      randomUsersRatings: [],
      currentUsersAverage: 0,
      currentUsersRatings: [],
      similarityScore: 0,
    },
    Steve: {
      name: 'Steve',
      randomUsersAverage: 0,
      randomUsersRatings: [],
      currentUsersAverage: 0,
      currentUsersRatings: [],
      similarityScore: 0,
    },
  }

  // eslint-disable-next-line require-await
  public static async calculateUserCF(): Promise<any> {
    try {
      const currentUsersRatings =
        // @ts-ignore
        WebStorageService.checkForData().accounts[
          WebStorageService.getCurrentAuthorizedUser()
        ].ratings

      // Calculate the Average of Each Person
      const users = Object.keys(this.usersRatingsMap)

      // For all the random users
      for (let i = 0; i < users.length; i++) {
        const tempRandomUsersRatings = [
          ...this.randomUsersOriginalRatings[`${users[i]}`],
        ]
        const tempCurrentUsersRatings = [...currentUsersRatings]

        let averageC = 0
        let averageR = 0

        // Random user's rating which should include the removal of movies they and the current user have not watched
        for (let j = 0; j < tempRandomUsersRatings.length; j++) {
          // If one of the users have no seen movie i
          if (
            tempRandomUsersRatings[j] === 0 ||
            tempCurrentUsersRatings[j] === 0
          ) {
            tempRandomUsersRatings.splice(j, 1)
            tempCurrentUsersRatings.splice(j, 1)
            j -= 1
          } else {
            // Add the movie rating if they have seen the movie
            averageR += tempRandomUsersRatings[j]
            averageC += tempCurrentUsersRatings[j]
          }
          // Last value in the ratings array
          if (j === tempRandomUsersRatings.length - 1) {
            // Lengths should be the same
            averageR /= tempRandomUsersRatings.length
            averageC /= tempCurrentUsersRatings.length
          }
        }
        // Adding essential data
        this.usersRatingsMap[`${users[i]}`].randomUsersAverage = parseFloat(
          averageR.toFixed(3)
        )
        this.usersRatingsMap[`${users[i]}`].randomUsersRatings =
          tempRandomUsersRatings
        this.usersRatingsMap[`${users[i]}`].currentUsersAverage = parseFloat(
          averageC.toFixed(3)
        )
        this.usersRatingsMap[`${users[i]}`].currentUsersRatings =
          tempCurrentUsersRatings
      }

      // Hold array of similarity scores
      const similarityScoreRanking: SimilarityScores[] = []

      // Calculate Similarity Scores
      for (let i = 0; i < users.length; i++) {
        // numerator
        let numerator = 0
        // denominator
        const denominatorC: number[] = []
        const denominatorR: number[] = []
        let denominatorFinal: number = 0
        for (
          let j = 0;
          j < this.usersRatingsMap[`${users[i]}`].randomUsersRatings.length;
          j++
        ) {
          numerator +=
            (this.usersRatingsMap[`${users[i]}`].currentUsersRatings[j] -
              this.usersRatingsMap[`${users[i]}`].currentUsersAverage) *
            (this.usersRatingsMap[`${users[i]}`].randomUsersRatings[j] -
              this.usersRatingsMap[`${users[i]}`].randomUsersAverage)
          denominatorC.push(
            (this.usersRatingsMap[`${users[i]}`].currentUsersRatings[j] -
              this.usersRatingsMap[`${users[i]}`].currentUsersAverage) **
              2
          )
          denominatorR.push(
            (this.usersRatingsMap[`${users[i]}`].randomUsersRatings[j] -
              this.usersRatingsMap[`${users[i]}`].randomUsersAverage) **
              2
          )
          if (
            j ===
            this.usersRatingsMap[`${users[i]}`].randomUsersRatings.length - 1
          ) {
            const demC = denominatorC.reduce((a, b) => a + b, 0)
            const demR = denominatorR.reduce((a, b) => a + b, 0)
            denominatorFinal = Math.sqrt(demC * demR)
          }
        }
        // Produces final out of the similarity score
        if (denominatorFinal === 0) {
          this.usersRatingsMap[`${users[i]}`].similarityScore = 0
        } else {
          this.usersRatingsMap[`${users[i]}`].similarityScore = parseFloat(
            (numerator / denominatorFinal).toFixed(3)
          )
        }
        // Saving similarity scores above 0 to consider for movie recommendations for the current user
        if (this.usersRatingsMap[`${users[i]}`].similarityScore > 0) {
          similarityScoreRanking.push({
            name: users[i],
            score: parseFloat(
              this.usersRatingsMap[`${users[i]}`].similarityScore.toFixed(3)
            ),
          })
        }
      }

      /*
           Using average method in order to predict the rating the current user will go movies they have not seen
           Will only use similarity scores above 0 (negative values will not be considered)
         */

      const recommendedMovies: { id: number; score: number }[] = []

      // Index of movie that the current user has not rated/watched
      const zeroIndexes: Promise<number[]> = new Promise((resolve) => {
        const result: number[] = []
        currentUsersRatings.forEach((rating, index) =>
          rating === 0 ? result.push(index) : null
        )
        resolve(result)
      })
      const movieIds = await zeroIndexes
      const lengthOfIndexes = movieIds.length

      for (let i = 0; i < lengthOfIndexes; i++) {
        let sum = 0
        let mult = 0
        for (let j = 0; j < similarityScoreRanking.length; j++) {
          sum += similarityScoreRanking[j].score
          mult +=
            similarityScoreRanking[j].score *
            this.randomUsersOriginalRatings[
              `${similarityScoreRanking[j].name}`
            ][movieIds[i]]
        }
        const predictedMovieScore = parseFloat(((1 / sum) * mult).toFixed(3))

        // Must be greater than 3.5 (a rating of 3.5-5 means the user likes the movie, therefore is a recommendation)
        if (predictedMovieScore > 3.5) {
          recommendedMovies.push({
            id: movieIds[i],
            score: predictedMovieScore,
          })
        }
      }

      return new Promise((resolve) => {
        resolve({
          usersRatingsMap: this.usersRatingsMap,
          randomUsersOriginalRatings: this.randomUsersOriginalRatings,
          similarityScoreRanking,
          recommendedMovies,
          currentUsersRatings,
        })
      })
    } catch (error) {
      console.log(error)
      BuefyService.dangerToast('An error occurred :(')
    }
  }
}
