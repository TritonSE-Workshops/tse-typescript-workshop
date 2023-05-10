type Animations<S extends string> = `party_${S}` | `${S}_spin` | `${S}_intensifies`;

type Emoji = Animations<"donut"> | Animations<"baguette"> | Animations<"basketball">;

// const emoji: Emoji = 



type KeepSpinsOnly<E> = E extends `${infer N}_spin` ? E : never;

type SpinEmoji = KeepSpinsOnly<Emoji>;
