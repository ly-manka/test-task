import { Request, Response } from 'express';
import axios from 'axios';
import 'dotenv/config'

const API_URL = process.env.API_BASE_URL || 'https://www.themealdb.com/api/json/v1/1/';


export const getRecipes = async (req: Request, res: Response) => {
  try {
    const { ingredient, country, category } = req.query;

    let url = `${API_URL}search.php?s=`;

    if (ingredient) {
      url = `${API_URL}filter.php?i=${ingredient}`;
    } else if (country) {
      url = `${API_URL}filter.php?a=${country}`;
    } else if (category) {
      url = `${API_URL}filter.php?c=${category}`;
    }

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching recipes');
  }
};

export const getRecipeInfo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${API_URL}lookup.php?i=${id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching recipe info');
  }
};

export const getAllAreas = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${API_URL}list.php?a=list`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching areas');
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${API_URL}list.php?c=list`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching categories');
  }
};

export const getAllIngredients = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${API_URL}list.php?i=list`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching ingredients");
  }
};
