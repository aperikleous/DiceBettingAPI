import { getUserList, getBetList, getUser, getBet, createBet, getBestBetPerUser } from '../utils';

export const resolvers = {
    Query: {
      getUserList: () => getUserList(),
      getBetList: () => getBetList(),
      getUser: (parent: any, { id }: any, { models }: any) => getUser(id),
      getBet: (parent: any, { id }: any, { models }: any) => getBet(id),
      getBestBetPerUser: (parent: any, { limit }: any, { models }: any) => getBestBetPerUser(limit)
    },
    Mutation: {
      createBet: (parent: any, {UserId, betAmount, chance}: any, { models }: any) => createBet({UserId, betAmount, chance})
    },
};