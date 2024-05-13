<script lang="ts">
	export let weightDiff;

	$: textInterpretation =
		weightDiff < -0.5
			? 'Wow, you lost a lot last week!'
			: weightDiff < -0.1
				? 'Nice progress! Steady effort wins!'
				: weightDiff < 0
					? 'Right direction! Win!'
					: 'Oh, what is that? Weight gain.';
	$: textRecommendation =
		weightDiff < -0.5
			? 'To keep muscle and primarily lose fat, dropping weight slower is advised.'
			: weightDiff < -0.1
				? 'You are losing weight primarily from fat. Keep going like this!'
				: weightDiff < 0
					? "Your weightloss journey is slowing. Monitor if it stays slow like this for 2 consecutive weeks. If so, it's time to change something."
					: "If you stuck to your diet, it's time to tinker with your intake.";
</script>

<div class="flex flex-col items-center mx-10">
	<p class="text-stone-500 text-center font-semibold">{textInterpretation}</p>
	<p class="text-stone-500 text-center text-sm">
		{textRecommendation} Adjust your calorie target?
	</p>
</div>
