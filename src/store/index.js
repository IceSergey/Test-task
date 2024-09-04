import { createStore } from 'vuex'

export default createStore({
	state: {
		transactions: [
			{ category: 'Доход', amount: 5000 },
			{ category: 'Расход', amount: 2000 },
		],
	},
	mutations: {
		addTransaction(state, transaction) {
			state.transactions.push(transaction)
		},
	},
	actions: {},
	modules: {},
})
