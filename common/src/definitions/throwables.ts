import { ItemType, type InventoryItemDefinition } from "../utils/objectDefinitions";
import { Vec, type Vector } from "../utils/vector";

export interface ThrowableDefinition extends InventoryItemDefinition {
    readonly itemType: ItemType.Throwable
    readonly image: {
        readonly position: Vector
        readonly angle?: number
    }
    readonly fireDelay?: number
    /**
     * Cookable grenades will explode after a certain amount of time (such as a
     * frag cooked too long will blow up in your hand)
     * Default: false
     */
    readonly cookable?: boolean
    readonly animation: {
        readonly cook: {
            readonly leftImage: string
            readonly liveImage: string
            readonly leftFist: Vector
            readonly rightFist: Vector
        }
    }
}

export const Throwables: ThrowableDefinition[] = [
    {
        idString: "frag_grenade",
        name: "Frag Grenade",
        itemType: ItemType.Throwable,
        speedMultiplier: 0.92,
        image: {
            position: Vec.create(60, 43),
            angle: 60
        },
        cookable: true,
        animation: {
            cook: {
                leftImage: "proj_frag_pin",
                liveImage: "proj_frag",
                leftFist: Vec.create(38, -35),
                rightFist: Vec.create(-10, 43)
            }
        }
    },
    {
        idString: "smoke_grenade",
        name: "Smoke Grenade",
        itemType: ItemType.Throwable,
        speedMultiplier: 0.92,
        image: {
            position: Vec.create(60, 43),
            angle: 60
        },
        animation: {
            cook: {
                leftImage: "proj_smoke_pin",
                liveImage: "proj_smoke",
                leftFist: Vec.create(38, -35),
                rightFist: Vec.create(-10, 43)
            }
        }
    }
];
