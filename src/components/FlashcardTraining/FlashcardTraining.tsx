/* eslint-disable no-case-declarations */
/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect, useRef } from "react";
import {
	useTypedStoreActions,
	useTypedStoreState,
} from "../../store/easy-peasy-hooks";
import * as config from "../../config";
import * as qstr from "../../qtools/qstr";
import { FlashcardAttempt } from "../../types";
import "./styles.scss";

export const FlashcardTraining = () => {
	const { testingFlashcard, answer, answerIsCorrect, testingStatus } =
		useTypedStoreState((state) => state.flashcardModel);
	const { user } = useTypedStoreState((state) => state.authenticationModel);
	const { incrementTotalScore } = useTypedStoreActions(
		(actions) => actions.authenticationModel
	);
	const {
		setNextTestingFlashcard,
		setAnswer,
		setAnswerIsCorrect,
		setTestingStatus,
	} = useTypedStoreActions((actions) => actions.flashcardModel);
	const { isSmartphone, responsiveCssClass } = useTypedStoreState(
		(state) => state.mainModel
	);
	const inputBoxRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		setNextTestingFlashcard();
	}, []);

	const getCurrentHistoryItem = () => {
		return user.flashcardHistory[testingFlashcard.idCode];
	};

	const handleMainButtonPress = () => {
		switch (testingStatus) {
			case "typingAnswer":
				if (answer === testingFlashcard.back) {
					// answer is right
					const flashcardAttempt: FlashcardAttempt = {
						when: qstr.getCurrentTimestamp(),
						answer: answer,
						status: "right",
					};
					getCurrentHistoryItem().attempts.push(flashcardAttempt);
					getCurrentHistoryItem().timesAnsweredRight++;
					setTestingStatus("lookingAtRightAnswer");
					incrementTotalScore(config.pointsForRightAnswer());
				} else {
					// answer is wrong
					const flashcardAttempt: FlashcardAttempt = {
						when: qstr.getCurrentTimestamp(),
						answer: answer,
						status: "wrong",
					};
					getCurrentHistoryItem().attempts.push(flashcardAttempt);
					getCurrentHistoryItem().timesAnsweredWrong++;
					setTestingStatus("lookingAtWrongAnswer");
					incrementTotalScore(config.pointsForWrongAnswer());
				}
				break;
			case "lookingAtWrongAnswer":
				setTestingStatus("typingAnswer");
				setAnswer("");
				break;
			case "lookingAtRightAnswer":
				setNextTestingFlashcard();
				break;
		}
		if (inputBoxRef.current) {
			inputBoxRef.current.focus();
		}
	};

	const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setAnswer(value);
		setAnswerIsCorrect(value === testingFlashcard.back);
	};

	const currentAnswerBackgroundColor = (): string => {
		if (answer.trim() === "") {
			return "#eee";
		} else {
			return answerIsCorrect ? "#ecf5e9" : "#f5ebee";
		}
	};

	const currentAnswerTextColor = (): string => {
		if (answer.trim() === "") {
			return "black";
		} else {
			return answerIsCorrect ? "darkgreen" : "darkred";
		}
	};

	const getSmartDate = (attempt: FlashcardAttempt) => {
		return isSmartphone ? qstr.getSmallDate(attempt.when) : attempt.when;
	};

	return (
		<section className="areaFlashcardTraining">
			<div className={responsiveCssClass}>
				{getCurrentHistoryItem() && (
					<div className="bg-slate-300 p-3 w-full rounded">
						{isSmartphone && (
							<div className="mb-3">
								<div className="text-[1rem] flex gap-3 min-w-[14rem] bg-slate-200 py-1 px-2 mb-2 justify-between rounded-t-md">
									<p className="text-green-800">
										times got right:{" "}
										{
											getCurrentHistoryItem()
												.timesAnsweredRight
										}
									</p>
									<p className="text-red-800">
										times got wrong:{" "}
										{
											getCurrentHistoryItem()
												.timesAnsweredWrong
										}
									</p>
								</div>
								<p className="text-[1.3rem] text-center">
									{testingFlashcard.front}&nbsp;
								</p>
							</div>
						)}
						{!isSmartphone && (
							<div className="flex justify-between">
								<p className="mb-3">
									{testingFlashcard.front}&nbsp;
								</p>
								<div className="text-xs flex gap-3 min-w-[14rem] justify-end">
									<p className="text-green-800">
										times got right:{" "}
										{
											getCurrentHistoryItem()
												.timesAnsweredRight
										}
									</p>
									<p className="text-red-800">
										times got wrong:{" "}
										{
											getCurrentHistoryItem()
												.timesAnsweredWrong
										}
									</p>
								</div>
							</div>
						)}

						<div className="inputArea mb-2">
							<input
								value={answer}
								ref={inputBoxRef}
								autoCapitalize="off"
								spellCheck={false}
								autoCorrect="off"
								autoComplete="off"
								className="rounded w-full p-1"
								style={{
									backgroundColor:
										currentAnswerBackgroundColor(),
									color: currentAnswerTextColor(),
								}}
								placeholder="spanish"
								onChange={(e) => handleAnswerChange(e)}
								autoFocus={true}
								onKeyDown={(e) => {
									if (
										e.key === "Enter" &&
										answer.trim() !== ""
									) {
										handleMainButtonPress();
									}
								}}
							/>
							<button
								className="bg-slate-400 rounded opacity-80 hover:opacity-100 whitespace-nowrap px-2 py-1"
								onClick={() => handleMainButtonPress()}
							>
								{testingStatus === "typingAnswer" && (
									<span>submit answer</span>
								)}
								{testingStatus === "lookingAtWrongAnswer" && (
									<span className="text-red-700">try again</span>
								)}
								{testingStatus === "lookingAtRightAnswer" && (
									<span className="text-green-800">next flashcard</span>
								)}
							</button>
						</div>
						{testingStatus === "lookingAtWrongAnswer" && (
							<div>
								<p className="text-green-800 ml-1">
									{testingFlashcard.back}
								</p>
								{isSmartphone && (
									<p className="text-red-800 ml-1">
										{answer}
									</p>
								)}
							</div>
						)}
						{testingStatus === "lookingAtRightAnswer" && (
							<div className="answerArea">
								{getCurrentHistoryItem().attempts.map(
									(attempt, index) => {
										return (
											<div
												key={index}
												className="flex gap-1"
											>
												<div className="w-fit whitespace-nowrap text-slate-700">
													{getSmartDate(attempt)}
												</div>
												<div
													className={`${
														attempt.status ===
														"right"
															? "text-green-800 ml-1"
															: "text-red-800 ml-1"
													}`}
													key={index}
												>
													{attempt.answer}
												</div>
											</div>
										);
									}
								)}
							</div>
						)}
					</div>
				)}
			</div>
			<p className="font-mono text-xs text-slate-500 w-full text-right mt-1">
				ver {config.appVersion()}
			</p>
		</section>
	);
};
