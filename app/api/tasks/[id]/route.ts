import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params 
    await prisma.task.delete({
      where: { id: parseInt(id) }
    })
    return NextResponse.json({ message: 'Task deleted' })
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting task' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: body
    })
    
    return NextResponse.json(updatedTask)
  } catch (error) {
    return NextResponse.json({ message: 'Error updating task' }, { status: 500 })
  }
}