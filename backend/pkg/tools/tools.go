package tools

import "strings"

func CapitalizeFirstLetter(text string) string {
	return strings.ToUpper(string(text[0])) + text[1:]
}

func Sentencize(text string) string {
	if len(text) == 0 {
		return ""
	}
	lastChar := text[len(text)-1]
	if lastChar == '.' || lastChar == '!' || lastChar == '?' {
		return text
	}
	ret := text + "."
	return CapitalizeFirstLetter(ret)
}
