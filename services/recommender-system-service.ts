import { SimilarityScores } from '~/interfaces/SimilarityScores'

export default class RecommenderSystemService {
  // Marvel Movies
  private static movies = [
    'Shang-Chi and the Legend of the Ten Rings',
    'Spider-Man: Homecoming',
    'Avengers: Endgame',
    'Iron Man',
    'Spider-Man: Into the Spider-Verse ',
    'Avengers: Infinity War',
    'Iron Man 3',
    'Thor: Ragnarok',
    'The Avengers',
    'Black Panther',
    'Spider-Man: Far From Home',
  ]

  // Predefined User Ratings (Randomly Generated from 0-5)
  private static randomUsersOriginalRatings: any = {
    Alice: [4, 0, 1, 1, 3, 3, 2, 3, 2, 1],
    Ashley: [3, 3, 5, 1, 5, 2, 4, 5, 0, 1],
    Bob: [0, 1, 5, 2, 1, 6, 5, 4, 4, 1],
    Cindy: [5, 2, 3, 0, 3, 2, 0, 3, 1, 4],
    David: [2, 3, 2, 1, 5, 1, 2, 0, 5, 2],
    Dhanayush: [5, 4, 1, 2, 3, 2, 4, 5, 4, 3],
    Hitarth: [3, 4, 3, 1, 5, 1, 2, 0, 5, 2],
    Michael: [5, 5, 5, 4, 4, 3, 3, 3, 3, 5],
    Peter: [5, 5, 5, 4, 3, 4, 2, 3, 4, 0],
    Steve: [3, 4, 0, 5, 5, 2, 3, 1, 4, 2],
  }

  public static calculateUserCF() {
    // currentUsersRatings: number[]

    const currentUsersRatings = [0, 1, 2, 3, 4, 1, 2, 3, 4, 5]
    // Index of movie that the current user has not rated/watched
    const zeroIndex = currentUsersRatings.indexOf(0)

    // Mapping of transformed the ratings' data
    // Each predefined user is denoted as a 'random user'
    const usersRatingsMap = {
      Alice: {
        randomUsersAverage: 0,
        randomUsersRatings: [],
        currentUsersAverage: 0,
        currentUsersRatings: [],
        similarityScore: 0,
      },
      Ashley: {
        randomUsersAverage: 0,
        randomUsersRatings: [],
        currentUsersAverage: 0,
        currentUsersRatings: [],
        similarityScore: 0,
      },
      Bob: {
        randomUsersAverage: 0,
        randomUsersRatings: [],
        currentUsersAverage: 0,
        currentUsersRatings: [],
        similarityScore: 0,
      },
      Cindy: {
        randomUsersAverage: 0,
        randomUsersRatings: [],
        currentUsersAverage: 0,
        currentUsersRatings: [],
        similarityScore: 0,
      },
      David: {
        randomUsersAverage: 0,
        randomUsersRatings: [],
        currentUsersAverage: 0,
        currentUsersRatings: [],
        similarityScore: 0,
      },
      Dhanayush: {
        randomUsersAverage: 0,
        randomUsersRatings: [],
        currentUsersAverage: 0,
        currentUsersRatings: [],
        similarityScore: 0,
      },
      Hitarth: {
        randomUsersAverage: 0,
        randomUsersRatings: [],
        currentUsersAverage: 0,
        currentUsersRatings: [],
        similarityScore: 0,
      },
      Michael: {
        randomUsersAverage: 0,
        randomUsersRatings: [],
        currentUsersAverage: 0,
        currentUsersRatings: [],
        similarityScore: 0,
      },
      Peter: {
        randomUsersAverage: 0,
        randomUsersRatings: [],
        currentUsersAverage: 0,
        currentUsersRatings: [],
        similarityScore: 0,
      },
      Steve: {
        randomUsersAverage: 0,
        randomUsersRatings: [],
        currentUsersAverage: 0,
        currentUsersRatings: [],
        similarityScore: 0,
      },
    }

    // Calculate the Average of Each Person
    const users = Object.keys(usersRatingsMap)

    for (let i = 0; i < users.length; i++) {
      const tempRandomUsersRatings = [
        ...this.randomUsersOriginalRatings[`${users[i]}`],
      ]
      const tempCurrentUsersRatings = [...currentUsersRatings]

      let averageC = 0
      let averageR = 0

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
      usersRatingsMap[`${users[i]}`].randomUsersAverage = averageR
      usersRatingsMap[`${users[i]}`].randomUsersRatings = tempRandomUsersRatings
      usersRatingsMap[`${users[i]}`].currentUsersAverage = averageC
      usersRatingsMap[`${users[i]}`].currentUsersRatings =
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
        j < usersRatingsMap[`${users[i]}`].randomUsersRatings.length;
        j++
      ) {
        numerator +=
          (usersRatingsMap[`${users[i]}`].currentUsersRatings[j] -
            usersRatingsMap[`${users[i]}`].currentUsersAverage) *
          (usersRatingsMap[`${users[i]}`].randomUsersRatings[j] -
            usersRatingsMap[`${users[i]}`].randomUsersAverage)
        denominatorC.push(
          (usersRatingsMap[`${users[i]}`].currentUsersRatings[j] -
            usersRatingsMap[`${users[i]}`].currentUsersAverage) **
            2
        )
        denominatorR.push(
          (usersRatingsMap[`${users[i]}`].randomUsersRatings[j] -
            usersRatingsMap[`${users[i]}`].randomUsersAverage) **
            2
        )
        if (
          j ===
          usersRatingsMap[`${users[i]}`].randomUsersRatings.length - 1
        ) {
          const demC = denominatorC.reduce((a, b) => a + b, 0)
          const demR = denominatorR.reduce((a, b) => a + b, 0)
          denominatorFinal = Math.sqrt(demC * demR)
        }
      }
      usersRatingsMap[`${users[i]}`].similarityScore =
        numerator / denominatorFinal

      if (usersRatingsMap[`${users[i]}`].similarityScore > 0) {
        similarityScoreRanking.push({
          name: users[i],
          score: usersRatingsMap[`${users[i]}`].similarityScore,
        })
      }
    }

    /*
         Using average method in order to predict the rating the current user will go movies they have not seen
         Will only use similarity scores above 0 (negative values will not be considered)
       */
    let sum = 0
    let mult = 0
    for (let i = 0; i < similarityScoreRanking.length; i++) {
      // 1 / (usr sim )
      sum += similarityScoreRanking[i].score
      mult +=
        similarityScoreRanking[i].score *
        this.randomUsersOriginalRatings[`${similarityScoreRanking[i].name}`][
          zeroIndex
        ]
    }

    const predictedMovieScore = ((1 / sum) * mult).toFixed(2)

    return {
      usersRatingsMap,
      similarityScoreRanking,
      predictedMovieScore,
    }
  }
}
