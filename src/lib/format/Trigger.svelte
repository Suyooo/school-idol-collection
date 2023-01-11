<script lang="ts">
    import Trigger from "$translation/trigger.js";
    import Language from "$types/language.js";

    export let lang: Language = Language.ENG;
    export let trigger: Trigger;
    export let closing: boolean = false;

    let lbr: string, rbr: string;
    $: lbr = lang.leftSquareBracket;
    $: rbr = lang.rightSquareBracket;
</script>

<span class="{trigger.cssClassName}" class:closing
      title={closing ? undefined : lbr + trigger[lang.triggerNameProperty] + rbr}>
    {closing ? "" : lbr + trigger[lang.triggerNameProperty] + rbr}
</span>

<style lang="postcss">
    span {
        @apply w-[3.65rem] h-5 bg-contain bg-no-repeat inline-block overflow-hidden align-top text-center text-none;

        &.entry {
            background-image: url("/images/card/skill_entry.png");
        }

        &.join {
            background-image: url("/images/card/skill_join.png");
        }

        &.success {
            background-image: url("/images/card/skill_success.png");
        }

        &.live {
            background-image: url("/images/card/skill_live.png");
        }

        &.start {
            background-image: url("/images/card/skill_start.png");
        }

        &.auto {
            background-image: url("/images/card/skill_auto.png");
        }

        &.standby {
            background-image: url("/images/card/skill_standby.png");
        }

        &.sp {
            @apply w-[4.45rem];
            background-image: url("/images/card/skill_sp.png");

            &.closing {
                @apply w-[.8rem] ml-[.2rem];
                background-image: url("/images/card/skill_sp_end.png");
            }
        }
    }
</style>