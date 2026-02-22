import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ScoreEntry {
    player: Principal;
    score: bigint;
}
export interface backendInterface {
    getAllScoresAscending(): Promise<Array<ScoreEntry>>;
    getAllScoresDescending(): Promise<Array<ScoreEntry>>;
    getScore(topOrBottom: bigint): Promise<ScoreEntry>;
    recordScore(score: bigint): Promise<void>;
}
