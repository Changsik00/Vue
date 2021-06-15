<template>
	<!-- <HelloWorld /> -->
	<div style="padding: 30px; position: relative; margin: 30px;">
		<div class="aspect-ratio-box">
			<video-player ref="videoPlayer" :options="playerOptions" />
			<div v-if="editMode" class="aspect-ratio-box-inside">
				<img v-if="backgroundImg" class="video-background-img" :src="backgroundImg" />
				<img class="video-character-img" :style="transform" :src="require(`@/assets/img/${character}.png`)" />
				<div class="vidio-character-img-mask" :style="imageMask"></div>
			</div>
			<div style="padding: 30px; background: white; z-index: 100; position: absolute; top: 100%;">
				<button style="padding: 20px; margin: 20xp" @click="start">start</button>
				<button style="padding: 20px; margin: 20xp" @click="pause">pause</button>
				<button style="padding: 20px; margin: 20xp" @click="add">add</button>
				<button style="padding: 20px; margin: 20xp" @click="prev">prev</button>
				<button style="padding: 20px; margin: 20xp" @click="next">next</button>
				<button style="padding: 20px; margin: 20xp" @click="toggle">toggle</button>
				<button style="padding: 20px; margin: 20xp" @click="changePosition">position</button>
				<button style="padding: 20px; margin: 20xp" @click="updown">updown</button>
				<button style="padding: 20px; margin: 20xp" @click="reverse">reverse</button>
				<button style="padding: 20px; margin: 20xp" @click="changeCharacter">character</button>
				<input ref="imageInput" type="file" hidden @change="onChangeImages" />
				<v-btn type="button" @click="onClickImageUpload">이미지 업로드</v-btn>
				<vue-slider
					style="width: 400px;"
					v-model="value"
					:max="max"
					@drag-end="dragEnd"
					@drag-start="dragStart"
					:drag-on-click="true"
					:dotSize="4"
					:process-style="{backgroundColor: '#ff8400'}"
					:tooltipFormatter="tooltipFormatter"
				/>
			</div>
		</div>
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
			editMode: false,
			tranformX: false,
			tranformY: false,
			position: 0,
			count: 0,
			value: 0,
			max: 0,
			backgroundImg: null,
			character: 'mioh',
			inDragging: false,
			playerOptions: {
				aspectRatio: '16:9',
				controls: false,
			},

			sources: [
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
		imageMask() {
			let ret = 'bottom: -10%;'
			if (this.tranformY) {
				ret = 'top: -10%;'
			}
			return ret
		},
		transform() {
			let ret = 'bottom: -10%;'
			if (this.tranformY) {
				ret = 'top: -10%;'
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
		},
		add() {
			const res = this.sources[this.count % this.sources.length]
			this.player.currentTime(this.value)
			this.player.src(res)
		},
		prev() {
			this.count = this.count - 1
			if (this.count < 0) this.count = 0
		},
		next() {
			this.count = this.count + 1
		},

		dragStart() {
			this.inDragging = true
		},
		dragEnd() {
			this.inDragging = false
		},
		tooltipFormatter() {
			return this.toHHMMSS(this.value)
		},
		toHHMMSS(num) {
			var sec_num = parseInt(num, 10)
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
		changeCharacter() {
			this.character == 'tommy' ? (this.character = 'mioh') : (this.character = 'tommy')
		},
		onClickImageUpload() {
			this.$refs.imageInput.click()
		},
		onChangeImages(e) {
			const file = e.target.files[0]
			this.backgroundImg = URL.createObjectURL(file)
		},
	},
}
</script>
<style lang="scss">
.vue-slider-dot-handle {
	background-color: #ff8400 !important;
	border-color: #ff8400 !important;
}
.vue-slider-dot-handle-focus {
	background-color: #ff8400 !important;
	border-color: #ff8400 !important;
	box-shadow: 0 0 0 5px rgba(194, 69, 11, 0.2);
}
</style>
<style lang="scss" scoped>
.aspect-ratio-box {
	position: relative;
	max-width: 1280px;
	min-width: 500px;
}
.aspect-ratio-box-inside {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background: white;

	.video-background-img {
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		position: absolute;
		object-fit: cover;
	}
	.video-character-img {
		width: 42%;
		position: absolute;
	}
	.vidio-character-img-mask {
		width: 100%;
		height: 10%;
		left: 0;
		position: absolute;
		background: white;
	}
}
</style>
