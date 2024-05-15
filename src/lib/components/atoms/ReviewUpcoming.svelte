<script lang="ts">
	const daysUntilSun = (() => {
		const today = new Date();
		const dayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, etc.

		// Calculate days until next Sunday
		const daysUntilSunday = 7 - dayOfWeek;

		return daysUntilSunday;
	})();
</script>

<p class="mx-24 my-8 text-stone-500 text-center font-semibold">
	The next review will be in {daysUntilSun} days on Sunday.
</p>
