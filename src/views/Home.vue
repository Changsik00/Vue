<template>
	<!-- <HelloWorld /> -->
	<div style="padding: 30px">
		<div style="position: relative;">
			<video-player ref="videoPlayer" :options="playerOptions" />
			<div
				v-show="editMode"
				style="width: 1280px; height: 720px; border: 1px solid red; position: absolute; top: 0; left:0; background: white"
			>
				<img style="width: 100px; position: absolute;" :style="transform" src="@/assets/img/puppy.jpg" />
			</div>
		</div>

		<button style="padding: 20px; margin: 20xp" @click="start">start</button>
		<button style="padding: 20px; margin: 20xp" @click="pause">pause</button>
		<button style="padding: 20px; margin: 20xp" @click="add">add</button>
		<button style="padding: 20px; margin: 20xp" @click="prev">prev</button>
		<button style="padding: 20px; margin: 20xp" @click="next">next</button>
		<button style="padding: 20px; margin: 20xp" @click="toggle">toggle</button>
		<button style="padding: 20px; margin: 20xp" @click="changePosition">position</button>
		<button style="padding: 20px; margin: 20xp" @click="updown">updown</button>
		<button style="padding: 20px; margin: 20xp" @click="reverse">reverse</button>
		<vue-slider
			style="width: 400px;"
			v-model="value"
			:max="max"
			@drag-end="dragEnd"
			@drag-start="dragStart"
			:drag-on-click="true"
			:dotSize="4"
			:process-style="{backgroundColor: 'pink'}"
			:tooltipFormatter="tooltipFormatter"
		/>
	</div>
</template>

<script>
import HelloWorld from '../components/HelloWorld'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
export default {
	components: {
		HelloWorld,
		VueSlider,
	},

	data() {
		return {
			editMode: true,
			tranformX: false,
			tranformY: false,
			position: 0,
			count: 0,
			value: 0,
			max: 0,
			inDragging: false,
			playerOptions: {
				// aspectRatio: '4:3',
				width: 1280,
				height: 720,
				controls: false,
				sources: [],
			},

			sources: [
				// {
				// 	type: 'video/mp4',
				// 	src: 'https://files.osf.io/v1/resources/h3e2974pj8/providers/osfstorage/5b7bf5e02da7bb001b70d8e4?direct=&mode=render&version=1',
				// },
				{
					type: 'video/mp4',
					src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
				},
				{
					type: 'video/mp4',
					src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
				},
				{
					type: 'video/mp4',
					src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
				},
				{
					type: 'video/mp4',
					src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
				},
				{
					type: 'video/mp4',
					src: 'https://ia800701.us.archive.org/26/items/SampleVideo1280x7205mb/SampleVideo_1280x720_5mb.mp4',
				},
			],
		}
	},
	computed: {
		player() {
			return this.$refs.videoPlayer.player
		},
		transform() {
			let ret = 'bottom: 0;'
			if (this.tranformY) {
				ret = 'top: 0;'
			}
			if (this.tranformX && this.tranformY) {
				ret += 'transform: rotate(180deg)'
			} else {
				ret += ' transform: '
				if (this.tranformX) ret += ' scaleX(-1)'
				if (this.tranformY) ret += ' scaleY(-1)'
			}
			if (this.position == 0) {
				ret += '; left: 0;'
			} else if (this.position == 1) {
				if (this.tranformX) {
					ret += 'translateX(50%); left: 50%;'
				} else {
					ret += 'translateX(-50%); left: 50%;'
				}
			} else {
				if (this.tranformX) {
					ret += 'translateX(100%); left: 100%;'
				} else {
					ret += 'translateX(-100%); left: 100%;'
				}
			}
			return ret
		},
	},
	watch: {
		value() {
			this.inDragging && this.player.currentTime(this.value)
		},
	},
	mounted() {
		this.player.on('timeupdate', () => {
			this.value = this.player.currentTime()
		})
	},
	beforeDestroy() {
		if (this.player) {
			this.player.dispose()
		}
	},
	methods: {
		start() {
			this.max = parseInt(this.player.duration())
			this.player.play()
		},
		pause() {
			this.player.pause()
			// this.player.dispose()
			// this.playerOptions.sources = [
			// 	{
			// 		type: 'video/mp4',
			// 		src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
			// 	},
			// ]
			// this.player.src('https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm')
			// this.player.src('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4')
		},
		add() {
			const res = this.sources[this.count % this.sources.length]
			// this.playerOptions.sources.push(res)
			// this.playerOptions.sources = [res]
			this.player.src(res)
		},
		prev() {
			this.count = this.count - 1
			if (this.count < 0) this.count = 0
			// console.log('#@#', this.playerOptions.sources)
			// const src = this.playerOptions.sources[this.count].src

			// console.log('#@# src', src)
			// this.player.src(src)
			// this.add()
			// console.log('#@#', this.playerOptions.sources)
		},
		next() {
			this.count = this.count + 1
			// this.add()
			// this.player.src(this.playerOptions.sources[this.count])

			// console.log('#@#', this.playerOptions.sources)
			// console.log('#@# src', this.playerOptions.sources[this.count].src)
			// this.player.poster('http://example.com/myImage.jpg')
			// this.player.src(
			// 	'https://files.osf.io/v1/resources/h3e2974pj8/providers/osfstorage/5b7bf5e02da7bb001b70d8e4?direct=&mode=render&version=1'
			// )
			// this.player.src('https://ia800701.us.archive.org/26/items/SampleVideo1280x7205mb/SampleVideo_1280x720_5mb.mp4')

			// this.playerOptions.sources = [
			// 	{
			// 		type: 'video/mp4',
			// 		src: 'https://files.osf.io/v1/resources/h3e2974pj8/providers/osfstorage/5b7bf5e02da7bb001b70d8e4?direct=&mode=render&version=1',
			// 	},
			// ]
		},

		dragStart() {
			this.inDragging = true
			// this.player.pause()
		},
		dragEnd() {
			this.inDragging = false
			// this.player.currentTime(this.value)
			// this.player.play()
		},
		tooltipFormatter() {
			return this.toHHMMSS(this.value)
		},
		toHHMMSS(num) {
			var sec_num = parseInt(num, 10) // don't forget the second param
			var hours = Math.floor(sec_num / 3600)
			var minutes = Math.floor((sec_num - hours * 3600) / 60)
			var seconds = sec_num - hours * 3600 - minutes * 60

			if (hours < 10 && hours > 0) {
				hours = '0' + hours
			}
			if (minutes < 10) {
				minutes = '0' + minutes
			}
			if (seconds < 10) {
				seconds = '0' + seconds
			}
			if (hours) {
				return hours + ':' + minutes + ':' + seconds
			}
			return minutes + ':' + seconds
		},
		toggle() {
			this.editMode = !this.editMode
		},
		changePosition() {
			this.position = this.position + 1
			if (this.position > 2) {
				this.position = 0
			}
		},
		updown() {
			this.tranformY = !this.tranformY
		},
		reverse() {
			this.tranformX = !this.tranformX
		},
	},
}
</script>
<style lang="scss">
.vue-slider-dot-handle {
	background-color: red !important;
	border: 1px solid red;
	&:hover {
		background-color: red !important;
		border: 1px solid red;
	}
}
.vue-slider-dot-handle-focus {
	background-color: red !important;
	border: 1px solid red;
}

.vue-slider-dot {
	background-color: red !important;
}
</style>
