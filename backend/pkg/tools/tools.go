package tools

import "strings"

func CapitalizeFirstLetter(text string) string {
	return strings.ToUpper(string(text[0])) + text[1:]
}