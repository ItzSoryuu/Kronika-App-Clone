import Image from "next/image";

import { quests } from "@/constants";
import { Progress } from "@/components/ui/progress";

type Props = {
  points: number;
};

// Menampilkan daftar target rank dan progress pencapaiannya
export const Quests = ({ points }: Props) => {
  return (
    <div className="border-2 rounded-xl p-4 space-y-4  font-nunito font-bold">
      <div className="flex items-center justify-between w-full space-y-2">
        <h3 className="font-bold text-lg">
          Target Rank
        </h3>
      </div>
      <ul className="w-full space-y-4">
        {quests.map((quest) => {
          const progress = Math.min((points / quest.value) * 100, 100);

          return (
            <div
              className="flex items-center w-full pb-4 gap-x-3"
              key={quest.title}
            >
              <Image
                src="/target.svg"
                alt="Target"
                width={40}
                height={40}
              />
              <div className="flex flex-col gap-y-2 w-full">
                <div className="text-neutral-700 flex text-sm justify-between">
                  <span>{quest.title}</span>
                  <span className={
                    progress >= 100 ? "text-blue-500":
                    progress >= 80 ? "text-green-500":
                    progress >= 50 ? "text-yellow-500":
                    progress >= 25 ? "text-orange-500":
                    "text-red-500"}>
                      {Math.round(progress)}%
                    </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          )
        })}
      </ul>
    </div>
  );
};
