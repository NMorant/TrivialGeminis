const express = require('express');
const router = express.Router();

//Models
const Question = require('../models/Question');

router.get('/questions/add', (req, res) =>{
    res.render('questions/add');
});

router.post('/questions/add', async (req, res) =>{
    //console.log(req.body);
    const { question, solution } = req.body;
    const errors = [];
    if(!question){
        errors.push({text: 'Escribe una pregunta copón!'});
    }
    if(!solution){
        errors.push({text: 'Escribe la solución hombre!'});
    }
    if (errors.length > 0){
        res.render('questions/add', {
            errors,
            question,
            solution
        })
    } else {
        const newQuestion = new Question({ question, solution });
        //console.log(newQuestion);
        await newQuestion.save();
        req.flash('success_msg', 'Pregunta añadida correctamente');
        res.redirect('/questions/all');
    }
});

router.get('/questions/all', async (req, res) =>{
    const questions = await Question.find();
    res.render ('questions/all', { questions });
});

router.get('/questions/edit/:id', async (req, res) => {
    const question = await Question.findById(req.params.id);
    res.render('questions/edit', {question});
});

router.put('/questions/edit/:id', async (req, res) =>{
    const {question, solution} = req.body;
    await Question.findByIdAndUpdate(req.params.id, {question, solution});
    req.flash('success_msg', 'Se ha modificado la pregunta correctamente');
    res.redirect('/questions/all');
});

router.delete('/questions/delete/:id', async (req, res) =>{
    await Question.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Se ha borrado la pregunta con éxito');
    res.redirect('/questions/all');
});

module.exports = router;