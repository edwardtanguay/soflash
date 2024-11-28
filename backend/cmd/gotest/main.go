package main

import (
	"fmt"

	"github.com/edwardtanguay/soflash/pkg/tools"
)

func main() {
	message := "this is a test"
	fmt.Println(tools.Sentencize(message))
}