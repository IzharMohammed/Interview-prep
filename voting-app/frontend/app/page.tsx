"use client";
import { getVote, giveVote } from "@/actions/vote";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Teams {
  // id:string,
  name: string;
  voteCount: number;
}

export default function Home() {
  const [teams, setTeams] = useState<Teams[]>([]);
  const [voting, setVoting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchVotes = async () => {
    const response = await getVote();
    setTeams(response.result);
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  const handleVote = async (team: string) => {
    setVoting(team);
    try {
      await giveVote(team);
      await fetchVotes();
      router.refresh();
    } catch (error) {
      setError(`Failed to vote for Team ${team}`);
      console.error(error);
    } finally {
      setVoting(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Team Voting App</h1>

        {/* Vote Display */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {teams.map((t) => (
            // ✅ Add unique key
            <div key={t.name} className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Team {t.name}</h2>
                <div className="text-4xl font-bold text-blue-600 mb-4">
                  {t.voteCount}
                </div>
                <p className="text-gray-500 text-sm">votes</p>
              </div>
            </div>
          ))}
        </div>

        {/* Vote Buttons */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Cast Your Vote
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {["A", "B", "C"].map((team) => (
              <button
                key={team}
                onClick={() => handleVote(team)}
                disabled={voting === team}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {voting === team ? "Voting..." : `Vote for ${team}`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
