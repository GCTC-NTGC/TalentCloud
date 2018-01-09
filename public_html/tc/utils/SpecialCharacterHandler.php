<?php

/*
 * Summary: removes special characters for inserting tab title in Excel Spreadsheets
 */

class SpecialCharacterHandler{
	
	/**
	 * @param string $string
	 * @return string $fixedString
	 */
	public function removeSpecialCharacters($string){
		$forbiddenCharacters = array("*","/","\\","?","[","]");
		$fixedString = str_replace($forbiddenCharacters, "", $string);
		return $fixedString;
	}
}
?>
