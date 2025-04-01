<script lang="ts">
	import { page } from '$app/state';
	import { calorieManager, proteinManager } from '$lib/stateManagers.svelte';

	import Base from './Base.svelte';

	interface SvgInfo {
		width: number;
		height: number;
		path: string;
		strokeWidth: number;
		glowColor: 'blue' | 'yellow';
		glowLineColor?: string;
		opacity?: number;
	}

	let calories: SvgInfo = {
		width: 111,
		height: 122,
		path: 'M93.5 7.5H101C102.105 7.5 103 8.39543 103 9.5V55.5C103 56.6046 102.105 57.5 101 57.5H 44.1658C 43.4453 57.5 42.7805 57.8875 42.4255 58.5144 L9 114',
		strokeWidth: 1,
		glowColor: 'yellow',
		glowLineColor: '#FFEF62'
	};

	let protein: SvgInfo = {
		width: 49.5,
		height: 148,
		path: 'M 25,75 V 24',
		strokeWidth: 1.5,
		glowColor: 'blue'
	};

	let powerUps: SvgInfo = {
		width: 49.5,
		height: 148,
		path: 'M 25,124 V 70',
		strokeWidth: 1.5,
		glowColor: 'blue',
		opacity: page.data.user.streakMeter * 20
	};

	let bodyfat: SvgInfo = {
		width: 49.5,
		height: 148,
		path: 'M 25,70 V 36',
		strokeWidth: 1.5,
		glowColor: 'blue'
	};

	let singleBent: SvgInfo = {
		width: 116,
		height: 64,
		path: 'M96 25L32.5 25L20 44',
		strokeWidth: 1.5,
		glowColor: 'blue'
	};

	let doubleBent: SvgInfo = {
		width: 110,
		height: 108,
		path: 'M20 88V71L90 45V24.5',
		strokeWidth: 1.5,
		glowColor: 'blue'
	};

	let plan: SvgInfo = {
		width: 49.5,
		height: 148,
		path: 'M 25,75 V 18',
		strokeWidth: 1.5,
		glowColor: 'blue'
	};
</script>

<div class="absolute">
	<!-- Calories -->
	<Base svgInfo={calories} glowStrength={calorieManager.inRange ? 1 : 0} translate={[9, 34]} />
	<!-- Protein -->
	<Base svgInfo={protein} glowStrength={proteinManager.eatenPct} translate={[-52, 50]} />
	<!-- PowerUps -->
	<Base
		svgInfo={powerUps}
		glowStrength={page.data.user.streakMeter / 5}
		translate={[-134, 79]}
		rotate={90}
	/>
	<!-- Bodyfat -->
	<Base
		svgInfo={bodyfat}
		glowStrength={page.data.dailyProgress.bodyfat ? 1 : 0}
		translate={[-10, 79]}
		rotate={90}
		hidden={!page.data.user.enterBodyfatToday}
	/>
	<!-- Review -->
	<Base
		svgInfo={singleBent}
		glowStrength={page.data.dailyProgress.review ? 1 : 0}
		translate={[15, 194]}
		hidden={!page.data.user.reviewToday}
	/>
	<!-- Photo -->
	<Base
		svgInfo={singleBent}
		glowStrength={page.data.dailyProgress.progressPic ? 1 : 0}
		vflip={true}
		translate={[15, -304]}
		hidden={page.data.schedule.nextProgressPic.remainingDays > 0}
	/>
	<!-- Weigh -->
	<Base
		svgInfo={doubleBent}
		glowStrength={page.data.dailyProgress.weighIn ? 1 : 0}
		translate={[-103, 184]}
		scale={1.04}
	/>
	<!-- Plan -->
	<Base
		svgInfo={plan}
		glowStrength={page.data.dailyProgress.planned ? 1 : 0}
		translate={[-52, 145]}
	/>
	<!-- Eat -->
	<Base
		svgInfo={doubleBent}
		glowStrength={calorieManager.eatenPct}
		hflip={true}
		translate={[-2, 184]}
		scale={1.04}
	/>
</div>
