<script lang="ts">
	let { text }: { text: string } = $props();
</script>

<!--
  Wrapper to create the corner cut effect for the ribbon.
  - 'top-2' and 'left-2' (0.5rem gap)
  - 'w-[230px]' and 'h-[230px]' control the visible area of the ribbon. These values are tuned
    for the text size and rotation.
-->
<div
	class="pointer-events-none fixed top-1.5 left-1.5 z-[1000] h-[175px] w-[175px] overflow-hidden md:h-[250px] md:w-[250px]"
	aria-hidden="true"
>
	<!--
    The actual ribbon element.
    - 'left-[-47px]' pushes the rotation starting point off-screen to the left.
    - 'top-[112px]' positions it vertically within the wrapper before rotation.
    - 'w-[224px]' needs to be long enough to span the corner with the given text and rotation.
    - 'transform -rotate-45 origin-top-left' creates the diagonal ribbon effect.
  -->
	<div
		class="
      font-roboto pointer-events-auto absolute top-[112px]
      left-[-40px] w-[216px] origin-top-left
      -rotate-45 transform
      bg-red-600 py-2 text-center
      text-lg
      font-black
      tracking-wider text-white
      shadow-lg
      md:top-[160px] md:left-[-67px] md:w-[320px] md:py-2.5 md:text-2xl
    "
		style="font-family: 'Roboto', sans-serif;"
	>
		{text}
	</div>
</div>
