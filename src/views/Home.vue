<template>
	<v-container>
		<h1>Статистика расходов</h1>
		<PieChart :data="pieData" />
	</v-container>
</template>

<script>
import PieChart from '@/components/PieChart.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
	name: 'HomeView',
	components: {
		PieChart,
	},
	setup() {
		const store = useStore()
		const pieData = computed(() => store.state.transactions)

		return { pieData }
	},
}
</script>

<style scoped>
h1 {
	text-align: center;
	margin-bottom: 20px;
}
</style>
