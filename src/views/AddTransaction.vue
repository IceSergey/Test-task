<template>
	<v-container>
		<h1>Добавить новую транзакцию</h1>
		<v-form @submit.prevent="addTransaction">
			<v-select
				v-model="category"
				:items="categories"
				label="Категория"
				required
			/>
			<v-text-field v-model="amount" label="Сумма" type="number" required />
			<v-btn type="submit" color="primary">Добавить</v-btn>
		</v-form>
	</v-container>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
	name: 'AddTransaction',
	setup() {
		const store = useStore()
		const router = useRouter()
		const category = ref('')
		const amount = ref(0)

		const categories = ['Доход', 'Расход']

		const addTransaction = () => {
			store.commit('addTransaction', {
				category: category.value,
				amount: parseFloat(amount.value),
			})
			router.push('/')
		}

		return { category, amount, categories, addTransaction }
	},
}
</script>

<style scoped>
h1 {
	text-align: center;
	margin-bottom: 20px;
}
</style>
