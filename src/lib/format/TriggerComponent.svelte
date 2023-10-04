<script lang="ts">
    import CardType from "$l/enums/cardType.js";
    import Language from "$l/enums/language.js";
    import TriggerEnum from "$l/enums/trigger.js";
    import type { TriggerID } from "$l/enums/trigger.js";

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

<span
    class="skill-icon {trigger.toCssClassName()}"
    class:jpn={lang === Language.JPN}
    class:closing
    title={closing ? undefined : lbr + trigger.toName(lang, cardType === CardType.MEMORY) + rbr}
>
    {closing ? "" : lbr + trigger.toName(lang, cardType === CardType.MEMORY) + rbr}
</span>

<style lang="postcss">
    .skill-icon {
        @apply w-[3.65em];

        &.entry {
            background-image: url("/images/icons/skill_entry.png");
            &.jpn {
                background-image: url("/images/icons/skill_entry_jpn.png");
            }
        }

        &.join {
            background-image: url("/images/icons/skill_join.png");
            &.jpn {
                background-image: url("/images/icons/skill_join_jpn.png");
            }
        }

        &.success {
            background-image: url("/images/icons/skill_success.png");
            &.jpn {
                background-image: url("/images/icons/skill_success_jpn.png");
            }
        }

        &.live {
            background-image: url("/images/icons/skill_live.png");
            &.jpn {
                background-image: url("/images/icons/skill_live_jpn.png");
            }
        }

        &.start {
            background-image: url("/images/icons/skill_start.png");
            &.jpn {
                background-image: url("/images/icons/skill_start_jpn.png");
            }
        }

        &.auto {
            background-image: url("/images/icons/skill_auto.png");
            &.jpn {
                background-image: url("/images/icons/skill_auto_jpn.png");
            }
        }

        &.standby {
            background-image: url("/images/icons/skill_standby.png");
            &.jpn {
                background-image: url("/images/icons/skill_standby_jpn.png");
            }
        }

        &.sp {
            @apply w-[4.45em];
            background-image: url("/images/icons/skill_sp.png");

            &.jpn {
                background-image: url("/images/icons/skill_sp_jpn.png");
            }
            &.closing {
                @apply w-[.8em] ml-[.2em];
                background-image: url("/images/icons/skill_sp_end.png");
            }
        }
    }
</style>
