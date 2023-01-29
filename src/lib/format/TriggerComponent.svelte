<script lang="ts">
    import TriggerEnum from "$lib/enums/trigger.js";
    import type {TriggerID} from "$lib/enums/trigger.js";
    import CardType from "$lib/enums/cardType.js";
    import Language from "$lib/enums/language.js";

    export let trigger: TriggerEnum;
    export let triggerId: TriggerID | undefined = undefined;
    export let closing: boolean = false;

    export let lang: Language = Language.ENG;
    export let cardType: CardType | undefined = undefined;

    $: {
        if (triggerId !== undefined) trigger = TriggerEnum.fromId(triggerId);
    }

    let lbr: string, rbr: string;
    $: lbr = lang.leftSquareBracket;
    $: rbr = lang.rightSquareBracket;
</script>

<span class="skill-icon {trigger.toCssClassName()}" class:closing
      title={closing ? undefined : lbr + trigger.toName(lang, cardType === CardType.MEMORY) + rbr}>
    {closing ? "" : lbr + trigger.toName(lang, cardType === CardType.MEMORY) + rbr}
</span>

<style lang="postcss">
    .skill-icon {
        @apply w-[3.65em];

        &.entry {
            background-image: url("/images/icons/skill_entry.png");
        }

        &.join {
            background-image: url("/images/icons/skill_join.png");
        }

        &.success {
            background-image: url("/images/icons/skill_success.png");
        }

        &.live {
            background-image: url("/images/icons/skill_live.png");
        }

        &.start {
            background-image: url("/images/icons/skill_start.png");
        }

        &.auto {
            background-image: url("/images/icons/skill_auto.png");
        }

        &.standby {
            background-image: url("/images/icons/skill_standby.png");
        }

        &.sp {
            @apply w-[4.45em];
            background-image: url("/images/icons/skill_sp.png");

            &.closing {
                @apply w-[.8em] ml-[.2em];
                background-image: url("/images/icons/skill_sp_end.png");
            }
        }
    }
</style>