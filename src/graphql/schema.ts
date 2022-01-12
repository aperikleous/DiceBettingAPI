import { gql } from 'apollo-server';

export const typeDefs = gql`

    type User {
      id: Int
      name: String
      balance: Float
    }
  
    type Bet {
        id: Int
        UserId: Int
        betAmount: Float
        chance: Float
        payout: Float
        win: Boolean
    }
    
    type Query {
      getUserList: [User!]
      getUser(id: Int!): User
      getBetList: [Bet!]
      getBet(id: Int!): Bet
      getBestBetPerUser(limit: Int): [Bet!]
    }

    type Mutation {
      createBet(UserId: Int!, betAmount: Float!, chance: Float!): Bet
    }
`;