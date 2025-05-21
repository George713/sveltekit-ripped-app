<script lang="ts">
	// Svelte & Sveltekit
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	// Logic
	import {
		animationManager,
		calorieManager,
		proteinManager,
		streakManager
	} from '$lib/stateManagers.svelte';
	// Relative imports
	import Base from './Base.svelte';

	interface SvgInfo {
		width: number;
		height: number;
		path: string;
		strokeWidth: number;
		glowColor: 'blue' | 'yellow';
		glowLineColor?: string;
	}

	let calories: SvgInfo = {
		width: 111,
		height: 122,
		path: 'M93.5 7.5H101C102.105 7.5 103 8.39543 103 9.5V55.5C103 56.6046 102.105 57.5 101 57.5 H 41.1658 C 40.4453 57.5 39.7805 57.8875 39.4255 58.5144 L6 120',
		strokeWidth: 1.5,
		glowColor: 'yellow',
		glowLineColor: '#FFEF62'
	};

	let protein: SvgInfo = {
		width: 49.5,
		height: 148,
		path: 'M 25,24 V 75',
		strokeWidth: 1.5,
		glowColor: 'blue'
	};

	let powerUps: SvgInfo = {
		width: 49.5,
		height: 148,
		path: 'M 25,124 V 70',
		strokeWidth: 1.5,
		glowColor: 'blue'
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
		path: 'M96 25 H32.5782 C31.9052 25 31.2773 25.33851 30.9074 25.90077 L15.999999 52',
		strokeWidth: 1.5,
		glowColor: 'blue'
	};

	let doubleBent: SvgInfo = {
		width: 110,
		height: 108,
		path: 'M19 88.5 V72.8906 C19 72.0547 19.51995 71.3069 21.30363 71.0158 L88.6964 45.9842 C89.48 45.6931 90 44.9453 90 44.1094 V25',
		strokeWidth: 1.5,
		glowColor: 'blue'
	};

	let plan: SvgInfo = {
		width: 49.5,
		height: 148,
		path: 'M 25 74 V 18',
		strokeWidth: 1.5,
		glowColor: 'blue'
	};

	afterNavigate(() => {
		animationManager.reset();
	});
</script>

<div class="absolute">
	<!-- Calories -->
	<Base
		svgInfo={calories}
		glowStrength={page.data.dailyProgress.vaultOpened || calorieManager.inRange ? 1 : 0}
		animate={animationManager.caloriePowerline}
		translate={[9, 34]}
	/>
	<!-- Protein -->
	<Base
		svgInfo={protein}
		glowStrength={proteinManager.eatenPct}
		animate={animationManager.proteinPowerline}
		translate={[-52, 50]}
	/>
	<!-- PowerUps -->
	<Base
		svgInfo={powerUps}
		glowStrength={streakManager.streak / 5}
		animate={animationManager.weighInPowerline}
		translate={[-134, 79]}
		rotate={90}
	/>
	<!-- Bodyfat -->
	<Base
		svgInfo={bodyfat}
		glowStrength={page.data.dailyProgress.bodyfat ? 1 : 0}
		animate={animationManager.bodyfatPowerline}
		translate={[77, 79]}
		rotate={270}
		hidden={!page.data.user.enterBodyfatToday && !page.data.dailyProgress.bodyfat}
	/>
	<!-- Review -->
	<Base
		svgInfo={singleBent}
		glowStrength={page.data.dailyProgress.review ? 1 : 0}
		animate={animationManager.reviewPowerline}
		translate={[15, 194]}
		hidden={!page.data.user.reviewToday}
	/>
	<!-- Photo -->
	<Base
		svgInfo={singleBent}
		glowStrength={page.data.dailyProgress.progressPic ? 1 : 0}
		animate={animationManager.progressPicPowerline}
		vflip={true}
		translate={[15, -304]}
		hidden={page.data.schedule.nextProgressPic.remainingDays > 0}
	/>
	<!-- Weigh -->
	<Base
		svgInfo={doubleBent}
		glowStrength={page.data.dailyProgress.weighIn ? 1 : 0}
		animate={animationManager.weighInPowerline}
		translate={[-103, 184]}
		scale={1.04}
	/>
	<!-- Plan -->
	<Base
		svgInfo={plan}
		glowStrength={page.data.dailyProgress.planned ? 1 : 0}
		animate={animationManager.planPowerline}
		translate={[-52, 145]}
	/>
	<!-- Eat -->
	<Base
		svgInfo={doubleBent}
		glowStrength={calorieManager.eatenPct}
		animate={animationManager.eatPowerline}
		hflip={true}
		translate={[-2, 184]}
		scale={1.04}
	/>
</div>
