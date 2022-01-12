import db from '../models';
import { users } from '../seeders/users'
import { bets } from '../seeders/bets'
import { QueryTypes } from 'sequelize'

interface user {
    id: number
    name: string
    balance: number
}

interface bet {
    id: number
    UserId: number
    betAmount: number
    chance: number
    payout: number
    win: boolean
}

export const createUsers = () => {
    users.map(user => {
        db.User.create(user);
    })
}

export const createBets = () => {
    bets.map(bet => {
        db.Bet.create(bet);
    })
}

export const getUserList = async (): Promise<user[]> => {
    const userdata = await db.User.findAll();
    const users = await userdata.map((user: user) => {
        return {
            id: user.id,
            name: user.name,
            balance: user.balance
        }
    })
    return users
}

export const getUser = async (id: number): Promise<user> => {
    const userdata = await db.User.findOne({ where: { id } })
    return {
        id: userdata.id,
        name: userdata.name,
        balance: userdata.balance
    }
}

export const getBetList = async (): Promise<bet[]> => {
    const betdata = await db.Bet.findAll();
    const bets = await betdata.map((bet: bet) => {
        return {
            id: bet.id,
            UserId: bet.UserId,
            betAmount: bet.betAmount,
            chance: bet.chance,
            payout: bet.payout,
            win: bet.win
        }
    })
    return bets;
}

export const getBet = async (id: number): Promise<bet> => {
    const betdata = await db.Bet.findOne({ where: { id } })
    return {
        id: betdata.id,
        UserId: betdata.UserId,
        betAmount: betdata.betAmount,
        chance: betdata.chance,
        payout: betdata.payout,
        win: betdata.win
    }
}

export const createBet = async (args: any): Promise<bet> => {
    const multiplier = 1 / args.chance;
    const payout = multiplier * args.betAmount;
    const win = Math.random() < 0.5;
    const user = await db.User.findOne({ where: { id: args.UserId } })
    const oldBalance = user.balance
    if (args.betAmount > oldBalance) {
        return {
            id: 0,
            UserId: 0,
            betAmount: 0,
            chance: 0,
            payout: 0,
            win: false
        }
    }
    let newBalance = oldBalance - args.betAmount;
    if (win) {
        newBalance += payout
    }
    await user.update({ balance: newBalance })
    const betdata = await db.Bet.create({ UserId: args.UserId, betAmount: args.betAmount, chance: args.chance, payout: payout, win: win})
    return {
        id: betdata.id,
        UserId: betdata.UserId,
        betAmount: betdata.betAmount,
        chance: betdata.chance,
        payout: betdata.payout,
        win: betdata.win
    }
}

export const getBestBetPerUser = async (limit: number): Promise<bet[]> => {
   const betdata = await db.sequelize.query('SELECT * FROM public."Bets" WHERE win = TRUE AND ("UserId", payout) IN ' +
                                           '(SELECT "UserId", MAX(payout) FROM public."Bets" WHERE win = TRUE GROUP BY "UserId") LIMIT ?', 
                                           { replacements: [limit], type: QueryTypes.SELECT })
   const bets = await betdata.map((bet: bet) => {
       return {
           id: bet.id,
           UserId: bet.UserId,
           betAmount: bet.betAmount,
           chance: bet.chance,
           payout: bet.payout,
           win: bet.win
       }
   });
   return bets
}

