<template>
	<div class="chart-container">
		<canvas ref="canvas" @mousemove="handleMouseMove" @mouseleave="hideTooltip"></canvas>
		<div v-if="tooltipVisible" :style="tooltipStyle" class="tooltip">
			{{ tooltipText }}
		</div>
	</div>
</template>

<script>
import { onMounted, ref, watch } from 'vue'

export default {
	name: 'PieChart',
	props: {
		data: {
			type: Array,
			required: true,
		},
	},
	setup(props) {
		const canvas = ref(null)
		const tooltipVisible = ref(false)
		const tooltipText = ref('')
		const tooltipStyle = ref({ left: '0px', top: '0px' })
		let chartData = []

		const drawPieChart = data => {
			const ctx = canvas.value.getContext('2d')

			// Масштабируем канвас для повышения разрешения
			const scale = window.devicePixelRatio || 1
			const width = 400
			const height = 400

			canvas.value.width = width * scale
			canvas.value.height = height * scale
			canvas.value.style.width = `${width}px`
			canvas.value.style.height = `${height}px`

			ctx.scale(scale, scale)

			const total = data.reduce((sum, item) => sum + item.amount, 0)

			let startAngle = 0
			chartData = []

			data.forEach(item => {
				const sliceAngle = (item.amount / total) * 2 * Math.PI
				const endAngle = startAngle + sliceAngle

				// Рисуем сегмент
				ctx.beginPath()
				ctx.moveTo(width / 2, height / 2)
				ctx.arc(width / 2, height / 2, width / 2, startAngle, endAngle)
				ctx.fillStyle = item.category === 'Доход' ? '#4caf50' : '#f44336'
				ctx.fill()

				// Записываем данные о сегменте для последующего использования
				chartData.push({
					startAngle,
					endAngle,
					percentage: ((item.amount / total) * 100).toFixed(2),
					label: item.category,
				})

				startAngle = endAngle
			})
		}

		const getMousePos = event => {
			const rect = canvas.value.getBoundingClientRect()
			return {
				x: event.clientX - rect.left,
				y: event.clientY - rect.top,
			}
		}

		const isInSegment = (x, y, startAngle, endAngle, radius) => {
			const dx = x - 200 // Центр канваса (ширина / 2)
			const dy = y - 200 // Центр канваса (высота / 2)
			const distance = Math.sqrt(dx * dx + dy * dy)
			const angle = Math.atan2(dy, dx)

			// Приводим угол к диапазону [0, 2π]
			const normalizedAngle = angle >= 0 ? angle : 2 * Math.PI + angle

			return (
				distance <= radius &&
				normalizedAngle >= startAngle &&
				normalizedAngle <= endAngle
			)
		}

		const handleMouseMove = event => {
			const pos = getMousePos(event)
			const radius = 200 // Радиус канваса (ширина / 2)
			let found = false

			chartData.forEach(segment => {
				if (isInSegment(pos.x, pos.y, segment.startAngle, segment.endAngle, radius)) {
					tooltipVisible.value = true
					tooltipText.value = `${segment.label}: ${segment.percentage}%`
					tooltipStyle.value = {
						left: `${event.clientX + 10}px`,
						top: `${event.clientY + 10}px`,
					}
					found = true
				}
			})

			if (!found) {
				tooltipVisible.value = false
			}
		}

		const hideTooltip = () => {
			tooltipVisible.value = false
		}

		onMounted(() => {
			drawPieChart(props.data)
		})

		watch(
			() => props.data,
			newData => {
				drawPieChart(newData)
			}
		)

		return {
			canvas,
			tooltipVisible,
			tooltipText,
			tooltipStyle,
			handleMouseMove,
			hideTooltip,
		}
	},
}
</script>

<style scoped>
.chart-container {
	position: relative;
}

canvas {
	display: block;
	margin: 0 auto;
	width: 400px;
	height: 400px;
	cursor: pointer;
}

.tooltip {
	position: absolute;
	background-color: rgba(0, 0, 0, 0.7);
	color: white;
	padding: 5px 10px;
	border-radius: 4px;
	pointer-events: none;
	white-space: nowrap;
	font-size: 14px;
}
</style>
