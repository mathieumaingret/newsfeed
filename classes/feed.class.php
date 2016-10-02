<?php

class Feed
{

	/**
	* Identifiant machine du compte 
	*/
	private $id;

	/**
	* URL du flux du site 
	*/
	private $url_diffusion;

	/**
	* Nombre de posts à afficher
	*/
	private $nb_posts;

	/**
	* Type de flux 
	*/
	private $type;

	/**
	* Titre du flux
	*/
	private $title;

	/**
	* Methode d'accès aux posts du flux RSS
	*/
	private $methods;


	public function __construct($datas)
	{
		$this->id 				= (string)$datas->id;
		$this->url_diffusion 	= (string)$datas->url_feed;
		$this->nb_posts 		= (int)$datas->nb_posts;
		$this->url_website		= (string)$datas->url_website;
		$this->type 			= (string)$datas->type;
		$this->title 			= (string)$datas->title;
		$this->methods 			= $datas->methods;
	}

	public function getID()
	{
		return $this->id;
	}
	public function getUrlDiffusion()
	{
		return $this->url_diffusion;
	}
	public function getNbPosts()
	{
		return $this->nb_posts;
	}
	public function getUrlWebsite()
	{
		return $this->url_website;
	}
	public function getType()
	{
		return $this->type;
	}
	public function getTitle()
	{
		return $this->title;
	}
	public function getMethods()
	{
		return $this->methods;
	}

	/**
	 * Get XML datas of feed and path to the posts items
	 */
	public function getXMLDatas()
	{
		if ($xml_file = simplexml_load_file($this->url_diffusion)) {
			$items_path = explode(" ", $this->methods->item);
			return (count($items_path) > 1) 
				? $xml_file->{$items_path[0]}->{$items_path[1]} 
				: $xml_file->{$items_path[0]};
		} else {
			return null;
		}
	}

	/**
	 * Get all posts infos regarding to feed agragation method
	 */
	public function setPostDatas($post)
	{
		$title  = $post->{$this->methods->title};
		$date 	= $post->{$this->methods->date};
		$desc 	= ($this->methods->description == 'content:encoded') 
				? $post->children("content", true)
				: $desc = $post->{$this->methods->description};
		$link 	= ($this->methods->link == "link['href']") 
				? $post->link['href'] 
				: $post->{$this->methods->link};
		
		return new Post($title, $date, $desc, $link);
	}

	/**
	 * Get posts
	 */
	public function getPosts($offset = 0)
	{
		$posts = $this->getXMLDatas();
		if (!$posts) {
			return null;
		}

		$post_wanted = array();

		if ($offset == 0) {
			$nb_posts = (count($posts) >= $this->nb_posts) ? $this->nb_posts : count($posts);
		} else {
			$nb_posts = 3;
		}

		for ($i = $offset; $i < ($nb_posts + $offset); $i++) {
			$post_wanted[] = $this->setPostDatas($posts[$i]);
		}

		return $post_wanted;
	}
}