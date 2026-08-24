import React, { useState } from "react";

export default function TerraformExamQuizCard() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanations, setShowExplanations] = useState({});

  const questions = [
    {
      id: "q1",
      title: "Question 1: Offline Validation & gRPC Schema",
      question:
        "When executing 'terraform validate' on an air-gapped machine with zero internet connection and no cloud credentials, why does the validation succeed?",
      options: [
        {
          id: "A",
          text: "Terraform connects to AWS using cached credentials in ~/.aws/credentials",
        },
        {
          id: "B",
          text: "terraform validate skips schema checking and only validates JSON formatting",
        },
        {
          id: "C",
          text: "Core forks the downloaded provider binary and queries its schema locally over gRPC IPC, validating the AST entirely in RAM",
        },
        {
          id: "D",
          text: "terraform validate calls the HashiCorp Registry API asynchronously",
        },
      ],
      correctAnswer: "C",
      explanation:
        "Every provider binary is a standalone executable. Core uses gRPC (GetProviderSchema) over local Unix domain sockets to retrieve all attribute types and constraints without touching the network.",
    },
    {
      id: "q2",
      title: "Question 2: Non-Atomic Failure Recovery",
      question:
        "During a terraform apply of 10 resources, resource #4 fails due to a cloud quota limit. What is the state of the infrastructure?",
      options: [
        {
          id: "A",
          text: "Terraform initiates an automatic rollback, deleting resources 1 through 3",
        },
        {
          id: "B",
          text: "Terraform commits resources 1 through 3 to terraform.tfstate, marks resource 4 as failed/tainted, and cancels remaining nodes",
        },
        {
          id: "C",
          text: "Terraform deletes the entire state file to prevent partial state corruption",
        },
        { id: "D", text: "Terraform freezes until manual input is provided" },
      ],
      correctAnswer: "B",
      explanation:
        "Terraform is non-atomic. Cloud resources cost money the moment they are provisioned, so completed resources are immediately committed to state to prevent orphaned assets.",
    },
    {
      id: "q3",
      title: "Question 3: Variable Precedence Hierarchy",
      question:
        "Given: default=80 in code, TF_VAR_port=8080 in environment, port=9000 in terraform.tfvars, and CLI flag -var='port=5000'. What is the resolved value?",
      options: [
        { id: "A", text: "80 (Default)" },
        { id: "B", text: "8080 (Environment Variable)" },
        { id: "C", text: "9000 (terraform.tfvars)" },
        { id: "D", text: "5000 (CLI -var flag)" },
      ],
      correctAnswer: "D",
      explanation:
        "CLI flags (-var / -var-file) hold the highest mathematical precedence in Terraform's resolution hierarchy, overriding all files and environment variables.",
    },
  ];

  const handleSelect = (qId, optionId) => {
    setSelectedAnswers({ ...selectedAnswers, [qId]: optionId });
  };

  const toggleExplanation = qId => {
    setShowExplanations({ ...showExplanations, [qId]: !showExplanations[qId] });
  };

  return (
    <div className="border-skin-line bg-skin-card my-8 rounded-2xl border p-6 font-mono text-sm shadow-xl">
      <div className="border-skin-line border-b pb-4">
        <span className="text-skin-accent text-xs font-semibold tracking-wider uppercase">
          Interactive Exam Lab
        </span>
        <h3 className="text-skin-base mt-1 text-lg font-bold">
          HashiCorp Certified Associate (004) Diagnostic Quizzes
        </h3>
        <p className="text-skin-base mt-1 text-xs opacity-80">
          Select your answer to evaluate your architectural reasoning against
          real first-principles mechanics.
        </p>
      </div>

      <div className="mt-6 space-y-6">
        {questions.map(q => {
          const userChoice = selectedAnswers[q.id];
          const isSubmitted = !!userChoice;
          const isCorrect = userChoice === q.correctAnswer;
          const isExpOpen = showExplanations[q.id];

          return (
            <div
              key={q.id}
              className="border-skin-line bg-skin-fill/50 rounded-xl border p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-skin-accent text-xs font-bold uppercase">
                  {q.title}
                </span>
                {isSubmitted && (
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-bold ${
                      isCorrect
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-rose-500/20 text-rose-400"
                    }`}
                  >
                    {isCorrect ? "CORRECT ✅" : "INCORRECT ❌"}
                  </span>
                )}
              </div>

              <p className="text-skin-base mt-2 text-xs leading-relaxed font-semibold">
                {q.question}
              </p>

              <div className="mt-4 space-y-2">
                {q.options.map(opt => {
                  const isSelected = userChoice === opt.id;
                  let btnStyle =
                    "border-skin-line bg-skin-card text-skin-base hover:border-skin-accent";

                  if (isSubmitted) {
                    if (opt.id === q.correctAnswer) {
                      btnStyle =
                        "border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold";
                    } else if (isSelected) {
                      btnStyle = "border-rose-500 bg-rose-500/10 text-rose-300";
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(q.id, opt.id)}
                      className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left text-xs transition ${btnStyle}`}
                    >
                      <span className="text-skin-accent font-bold uppercase">
                        {opt.id}.
                      </span>
                      <span className="flex-1">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {isSubmitted && (
                <div className="border-skin-line/60 mt-4 border-t pt-3">
                  <button
                    onClick={() => toggleExplanation(q.id)}
                    className="text-skin-accent flex items-center gap-1 text-xs font-bold hover:underline"
                  >
                    {isExpOpen
                      ? "Hide Architectural Reason ▲"
                      : "Show First-Principles Reason ▼"}
                  </button>

                  {isExpOpen && (
                    <div className="bg-skin-card text-skin-base border-skin-line mt-2 rounded-lg border p-3 text-xs leading-relaxed">
                      <span className="font-bold text-emerald-400">
                        Mechanical Explanation:{" "}
                      </span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
