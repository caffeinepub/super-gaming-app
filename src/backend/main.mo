import List "mo:core/List";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Principal "mo:core/Principal";

actor {
  type ScoreEntry = {
    player : Principal;
    score : Nat;
  };

  module ScoreEntry {
    public func compare(score1 : ScoreEntry, score2 : ScoreEntry) : Order.Order {
      Nat.compare(score1.score, score2.score);
    };
  };

  let scoreboard = List.empty<ScoreEntry>();

  public shared ({ caller }) func recordScore(score : Nat) : async () {
    let newEntry : ScoreEntry = {
      player = caller;
      score;
    };
    scoreboard.add(newEntry);
  };

  public query ({ caller }) func getAllScoresAscending() : async [ScoreEntry] {
    scoreboard.toArray().sort();
  };

  public query ({ caller }) func getAllScoresDescending() : async [ScoreEntry] {
    let scoreArray = scoreboard.toArray().sort();
    Array.tabulate(scoreArray.size(), func(i) { scoreArray[scoreArray.size() - 1 - i] });
  };

  public query ({ caller }) func getScore(topOrBottom : Nat) : async ScoreEntry {
    let sortedScores = scoreboard.toArray().sort();
    if (sortedScores.isEmpty()) {
      Runtime.trap("No scores yet");
    };
    if (topOrBottom >= sortedScores.size()) {
      Runtime.trap("Requested score index out of bounds");
    };
    sortedScores[topOrBottom];
  };
};

