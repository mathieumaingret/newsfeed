<?php

/**
* Post : dernier post d'un compte
*/
class Post
{
	private $title;
	private $date;
	private $description;
	private $link;
	private $picture;

	public function __construct($title, $date, $description, $link) {

		$this->title 		= (string)$title;

		$this->date 		= ($date) ? date('j/m G:i', strtotime((string)$date)) : '';

		$this->description  = strip_tags((string)$description, '<img>');

		$this->link 		= (string)$link;

		$this->picture 		= $this->setPicture();
	}

	public function setPicture()
	{
		preg_match_all('/src=(["\'])(.*?)\1/mi', $this->description, $pictures);

		return isset($pictures[0][0]) 
			? str_replace('src=', '', str_replace('"', '', $pictures[0][0]))
			: null;
	}

	public function getTitle()
	{
		return $this->title;
	}
	public function getDate()
	{
		return $this->date;
	}
	public function getDescription()
	{
		return $this->description;
	}
	public function getLink()
	{
		return $this->link;
	}
	public function getPicture()
	{
		return $this->picture;
	}
}
