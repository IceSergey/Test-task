<template>
	<v-app>
		<v-main>
			<!-- Добавляем кнопку для переключения между страницами -->
			<v-container>
				<v-btn @click="goToHome" color="primary">Домой</v-btn>
				<v-btn @click="goToAddTransaction" color="secondary">Добавить Транзакцию</v-btn>
			</v-container>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
	name: 'App',
	setup() {
		const router = useRouter()

		const goToHome = () => {
			router.push('/')
		}

		const goToAddTransaction = () => {
			router.push('/add-transaction')
		}

		return {
			goToHome,
			goToAddTransaction,
		}
	},
}
</script>

<style scoped>
v-container {
	margin-top: 20px;
	text-align: center;
}
</style>
